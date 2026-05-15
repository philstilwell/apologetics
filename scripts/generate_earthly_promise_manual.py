from __future__ import annotations

from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    Flowable,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_PDF = OUTPUT_DIR / "earthly-promise-test-field-manual.pdf"

PAGE_WIDTH, PAGE_HEIGHT = letter

INK = colors.HexColor("#121817")
BLUE = colors.HexColor("#143a53")
BLUE_MID = colors.HexColor("#22577a")
BLUE_SOFT = colors.HexColor("#e9f3f2")
MUTED = colors.HexColor("#4f5d59")
RUST = colors.HexColor("#9a5b1f")
RUST_DARK = colors.HexColor("#6e3e12")
GOLD = colors.HexColor("#ffe840")
GOLD_DARK = colors.HexColor("#8b610f")
GOLD_SOFT = colors.HexColor("#fff8d6")
GREEN = colors.HexColor("#3f7654")
GREEN_SOFT = colors.HexColor("#e7f4e8")
CREAM = colors.HexColor("#fffaf0")
SOFT = colors.HexColor("#f4faf8")
LINE = colors.HexColor("#a8c4c7")
WHITE = colors.white


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="CoverKicker",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=13,
            textColor=RUST_DARK,
            alignment=TA_LEFT,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CoverTitle",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=38,
            leading=42,
            textColor=BLUE,
            alignment=TA_LEFT,
            spaceAfter=12,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CoverSub",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=14,
            leading=20,
            textColor=MUTED,
            alignment=TA_LEFT,
            spaceAfter=18,
        )
    )
    styles.add(
        ParagraphStyle(
            name="H1",
            parent=styles["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=27,
            textColor=BLUE,
            spaceBefore=5,
            spaceAfter=9,
        )
    )
    styles.add(
        ParagraphStyle(
            name="H2",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=13.5,
            leading=17,
            textColor=RUST_DARK,
            spaceBefore=8,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=10.2,
            leading=14.6,
            textColor=INK,
            spaceAfter=7,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodySmall",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.6,
            leading=11.4,
            textColor=INK,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Muted",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.3,
            leading=12.4,
            textColor=MUTED,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Tiny",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=7.2,
            leading=8.9,
            textColor=MUTED,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableHead",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=7.7,
            leading=9.6,
            textColor=WHITE,
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableBody",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=7.25,
            leading=9.2,
            textColor=INK,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableBodySmall",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=6.85,
            leading=8.45,
            textColor=INK,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CalloutTitle",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=10.2,
            leading=12.4,
            textColor=BLUE,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CenterLabel",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=8,
            leading=10,
            textColor=MUTED,
            alignment=TA_CENTER,
        )
    )
    return styles


STYLES = build_styles()


def P(text: str, style: str = "Body") -> Paragraph:
    return Paragraph(text, STYLES[style])


def PE(text: str, style: str = "Body") -> Paragraph:
    return Paragraph(escape(text), STYLES[style])


def title(text: str) -> Paragraph:
    return P(escape(text), "H1")


def subtitle(text: str) -> Paragraph:
    return P(escape(text), "H2")


class HaloMark(Flowable):
    def __init__(self, size=58):
        super().__init__()
        self.size = size
        self.width = size
        self.height = size

    def draw(self):
        c = self.canv
        r = self.size / 2
        c.setFillColor(GOLD)
        c.circle(r, r, r, fill=1, stroke=0)
        c.setStrokeColor(GOLD_DARK)
        c.setLineWidth(1.7)
        c.circle(r, r, r * 0.62, fill=0, stroke=1)
        c.setFillColor(RUST)
        c.circle(r, r, r * 0.33, fill=1, stroke=0)


class MiniField(Flowable):
    def __init__(self):
        super().__init__()
        self.width = 6.5 * inch
        self.height = 1.35 * inch

    def draw(self):
        c = self.canv
        w = self.width
        h = self.height
        c.saveState()
        c.setFillColor(colors.HexColor("#101817"))
        c.rect(0, 0, w * 0.5, h, fill=1, stroke=0)
        c.setFillColor(colors.HexColor("#dff2d7"))
        c.rect(w * 0.5, 0, w * 0.5, h, fill=1, stroke=0)
        c.setStrokeColor(WHITE)
        c.setLineWidth(2)
        c.line(w * 0.5, 0, w * 0.5, h)
        c.setStrokeColor(LINE)
        c.setLineWidth(0.8)
        c.rect(0, 0, w, h, fill=0, stroke=1)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 7.2)
        c.drawString(8, 8, "PROTECTED")
        c.drawCentredString(w * 0.5, 8, "FALSIFIABILITY THRESHOLD")
        c.setFillColor(BLUE)
        c.drawRightString(w - 8, 8, "OPEN TO ROBUST SCIENCE")
        points = [
            (0.12, 0.58, "#22577a"),
            (0.24, 0.41, "#3f7654"),
            (0.38, 0.66, "#9a5b1f"),
            (0.58, 0.54, "#8b610f"),
            (0.78, 0.62, "#2f7a74"),
        ]
        for x, y, color in points:
            c.setFillColor(colors.HexColor("#ffffff"))
            c.setStrokeColor(colors.HexColor(color))
            c.setLineWidth(2)
            c.circle(w * x, h * y, 11, fill=1, stroke=1)
        c.restoreState()


def on_first_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(BLUE_SOFT)
    canvas.rect(0, PAGE_HEIGHT - 210, PAGE_WIDTH, 210, fill=1, stroke=0)
    canvas.setFillColor(BLUE_MID)
    canvas.rect(doc.leftMargin - 12, PAGE_HEIGHT - 160, 6, 96, fill=1, stroke=0)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(PAGE_WIDTH - doc.rightMargin, 26, "xhairs.com")
    canvas.restoreState()


def on_later_pages(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(BLUE_SOFT)
    canvas.rect(0, PAGE_HEIGHT - 42, PAGE_WIDTH, 42, fill=1, stroke=0)
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.7)
    canvas.line(doc.leftMargin, PAGE_HEIGHT - 42, PAGE_WIDTH - doc.rightMargin, PAGE_HEIGHT - 42)
    canvas.setFillColor(BLUE)
    canvas.setFont("Helvetica", 8.8)
    canvas.drawString(doc.leftMargin, PAGE_HEIGHT - 27, "Earthly Promise Test Field Manual")
    canvas.setFillColor(RUST_DARK)
    canvas.drawRightString(PAGE_WIDTH - doc.rightMargin, PAGE_HEIGHT - 27, "Crosshairs Audit Lab")
    canvas.setStrokeColor(LINE)
    canvas.line(doc.leftMargin, 43, PAGE_WIDTH - doc.rightMargin, 43)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7.7)
    canvas.drawString(
        doc.leftMargin,
        28,
        "A workbook for testing whether earthly promise claims are exposed to public feedback.",
    )
    canvas.drawRightString(PAGE_WIDTH - doc.rightMargin, 28, str(canvas.getPageNumber()))
    canvas.restoreState()


def bullet_list(items, style="BodySmall"):
    return ListFlowable(
        [ListItem(P(item, style), leftIndent=0) for item in items],
        bulletType="bullet",
        leftIndent=14,
        bulletFontName="Helvetica-Bold",
        bulletFontSize=8,
        bulletOffsetY=1.5,
        spaceBefore=1,
        spaceAfter=6,
    )


def numbered_rows(items):
    rows = []
    for number, title_text, body in items:
        rows.append(
            [
                P(f"<b>{number}</b>", "TableBody"),
                P(f"<b>{escape(title_text)}</b><br/>{escape(body)}", "TableBody"),
            ]
        )
    return table(
        rows,
        col_widths=[0.38 * inch, 6.12 * inch],
        header=False,
        tint=SOFT,
    )


def table(rows, col_widths, header=True, tint=SOFT, small=False):
    data = []
    body_style = "TableBodySmall" if small else "TableBody"
    for r, row in enumerate(rows):
        row_style = "TableHead" if header and r == 0 else body_style
        data.append([cell if hasattr(cell, "wrap") else P(str(cell), row_style) for cell in row])
    t = Table(data, colWidths=col_widths, hAlign="LEFT", repeatRows=1 if header else 0)
    style = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BOX", (0, 0), (-1, -1), 0.55, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.35, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5.5),
        ("BACKGROUND", (0, 0), (-1, -1), colors.white),
    ]
    if header:
        style.append(("BACKGROUND", (0, 0), (-1, 0), BLUE))
    else:
        style.append(("BACKGROUND", (0, 0), (-1, -1), tint))
    t.setStyle(TableStyle(style))
    return t


def callout(label, body, accent=BLUE_MID, tint=SOFT):
    t = Table(
        [[P(f"<b>{escape(label)}</b>", "CalloutTitle"), P(escape(body), "BodySmall")]],
        colWidths=[1.45 * inch, 5.05 * inch],
        hAlign="LEFT",
    )
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), tint),
                ("BOX", (0, 0), (-1, -1), 0.55, LINE),
                ("LINEBEFORE", (0, 0), (0, -1), 4, accent),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    return t


def three_cards(cards):
    cells = []
    for heading, body, tint in cards:
        inner = [P(f"<b>{escape(heading)}</b>", "CalloutTitle"), P(escape(body), "BodySmall")]
        cells.append(inner)
    t = Table([cells], colWidths=[2.05 * inch, 2.05 * inch, 2.05 * inch], hAlign="LEFT")
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, 0), cards[0][2]),
                ("BACKGROUND", (1, 0), (1, 0), cards[1][2]),
                ("BACKGROUND", (2, 0), (2, 0), cards[2][2]),
                ("BOX", (0, 0), (-1, -1), 0.55, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.55, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    return t


def section_page(story, heading):
    story.append(PageBreak())
    story.append(title(heading))


def build_story():
    story = []

    story.append(Spacer(1, 0.55 * inch))
    story.append(
        Table(
            [[P("CROSSHAIRS AUDIT LAB", "CoverKicker"), HaloMark(54)]],
            colWidths=[5.75 * inch, 0.75 * inch],
        )
    )
    story.append(Spacer(1, 1.15 * inch))
    story.append(P("Earthly Promise<br/>Test Field", "CoverTitle"))
    story.append(
        P(
            "A manual for sincere seekers, teachers, and debate partners who want to know "
            "whether earthly God-claims are genuinely open to verification.",
            "CoverSub",
        )
    )
    story.append(
        callout(
            "Core question",
            "If a promise is said to affect life here on earth, what would count as a fair check, and what result would be allowed to count against it?",
            RUST,
            CREAM,
        )
    )
    story.append(Spacer(1, 0.35 * inch))
    story.append(
        PE(
            "This manual explains the value of the tool, the basic workflow, the scoring language, "
            "and the habits of inquiry it is meant to cultivate. It is not a verdict on God. "
            "It is a disciplined way to ask whether a concrete earthly promise is being treated "
            "as a public claim or as a protected interpretation."
        )
    )

    section_page(story, "How to Use This Manual")
    story.append(
        PE(
            "Read the first two pages before using the tool for the first time. Use the middle "
            "sections while running a claim through the tool. Use the final pages when preparing "
            "a class discussion, debate, printed report, or AI Review handoff."
        )
    )
    story.append(
        table(
            [
                ["Part", "What it gives you"],
                ["Purpose", "Why sincere seekers benefit from testing earthly promise claims without turning inquiry into a gotcha."],
                ["Five steps", "The exact workflow used in the tool: choose, study, commit, name excuses, read result."],
                ["Scoring", "How study rigor, willingness, clean-failure posture, and excuse drag create the field score."],
                ["Promise guide", "What better tests, datasets, and confounders look like for each promise type."],
                ["Reports and AI", "How to use the printable report, suite-wide result, and AI Review prompt responsibly."],
            ],
            [1.45 * inch, 5.05 * inch],
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        callout(
            "Best starting move",
            "Do not begin by asking whether a whole religion is true. Begin with one concrete promise and ask what earthly outcome the promise is allowed to risk.",
            BLUE_MID,
            BLUE_SOFT,
        )
    )

    story.append(subtitle("1. Why This Tool Exists"))
    story.append(
        PE(
            "Many religious claims are not straightforwardly measurable. Claims about ultimate "
            "meaning, worship, moral grounding, or the purpose of suffering may not produce a "
            "clean public prediction. The Earthly Promise Test Field focuses on a narrower class "
            "of claims: promises that say something observable happens here."
        )
    )
    story.append(
        PE(
            "These include claims that prayer changes outcomes, God heals bodies, believers "
            "receive better guidance, faithful communities behave better, believers are protected "
            "from harm, sickness is reduced, lives are extended, or needs are providentially met. "
            "Once a claim points outward into public reality, ordinary questions become reasonable."
        )
    )
    story.append(
        callout(
            "The tool is not asking",
            "Does God exist? It is asking whether this particular earthly promise is being exposed to the kind of evidence it appears to invoke.",
            RUST,
            CREAM,
        )
    )

    section_page(story, "The Value for Sincere Seekers")
    story.append(
        PE(
            "The best use of the tool is not hostile. It lets a person say, "
            "\"I care about this promise enough to ask what would actually show it in the world.\" "
            "That posture can be uncomfortable, but it is also a form of intellectual honesty."
        )
    )
    story.append(
        three_cards(
            [
                (
                    "It separates hope from evidence",
                    "A person can value a promise while still asking whether the promise produces measurable differences.",
                    BLUE_SOFT,
                ),
                (
                    "It honors misses",
                    "If only hits are remembered, the claim is never really tested.",
                    GREEN_SOFT,
                ),
                (
                    "It exposes protective moves",
                    "Escape hatches may be sincere, but they can make every result compatible with the claim.",
                    GOLD_SOFT,
                ),
            ]
        )
    )
    story.append(Spacer(1, 10))
    story.append(
        bullet_list(
            [
                "It clarifies what is being claimed by requiring outcomes, comparison groups, and failure rules.",
                "It supports humility by distinguishing devotional meaning from public evidence.",
                "It helps believers avoid overclaiming when a promise is meaningful but not testable in its current form.",
                "It helps skeptics ask sharper questions without treating every claim as identical.",
            ]
        )
    )
    story.append(
        callout(
            "The sincere-seeker test",
            "Can I name a fair result that would lower my confidence before I know how the result turns out?",
            RUST,
            CREAM,
        )
    )

    story.append(subtitle("2. What the Tool Is For"))
    story.append(
        table(
            [
                ["Use it for", "Do not use it for"],
                [
                    "Claims about observable earthly effects: healing, prayer outcomes, protection, wisdom, prophecy, behavior, morbidity, longevity, or provision.",
                    "Claims that are explicitly symbolic, private, metaphysical, or detached from public outcomes.",
                ],
                [
                    "Debates where a promise is being offered as evidence that a personal God is active in earthly life.",
                    "Declaring that every theological claim must be laboratory science.",
                ],
                [
                    "Asking whether a claim is allowed to be disappointed by fair evidence.",
                    "Mocking stories, grief, hope, or personal meaning.",
                ],
            ],
            [3.25 * inch, 3.25 * inch],
        )
    )

    section_page(story, "The Five-Step Workflow")
    story.append(
        numbered_rows(
            [
                (
                    "1",
                    "Choose a promise",
                    "Start with the specific earthly promise being debated. A vague claim cannot be fairly tested until it names the kind of effect it says happens.",
                ),
                (
                    "2",
                    "Choose a study",
                    "Pick the strongest test the user would actually allow. The tool includes feasible examples, from anecdotes to replicated, blinded, large-sample studies.",
                ),
                (
                    "3",
                    "Change your mind",
                    "Before naming escape hatches, write the result that would honestly lower confidence. This is the pre-commitment step.",
                ),
                (
                    "4",
                    "Name excuses",
                    "Select the responses that would be used after a poor result. These reduce testability because they make failure harder to count.",
                ),
                (
                    "5",
                    "Read result",
                    "Review the diagnosis, personal-and-active-God question, suite-wide result, promise field map, report, and AI Review prompt.",
                ),
            ]
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        callout(
            "Why the commitment comes before excuses",
            "The tool slows down the moment when a claim shifts from \"this happens in the world\" to \"no worldly result could count against it.\"",
            BLUE_MID,
            BLUE_SOFT,
        )
    )

    story.append(subtitle("Reading the main controls"))
    story.append(
        table(
            [
                ["Control", "Meaning"],
                ["Active promise", "The promise currently being edited. It is marked throughout the tool by a bright yellow halo with a brown center."],
                ["Study", "The selected test or protocol. Stronger studies use clearer outcomes, better controls, blinding, preregistration, larger samples, or replication."],
                ["Run", "How willing the user is to actually submit the promise to the selected test."],
                ["Miss", "How willing the user is to let a clean failure count against the promise."],
                ["Drag", "The leftward pull from selected escape hatches."],
                ["Promise field map", "A suite-wide map comparing every promise at once. Higher points are more exposed; larger points use stronger studies; darker rings show excuse drag."],
            ],
            [1.55 * inch, 4.95 * inch],
        )
    )
    story.append(Spacer(1, 8))
    story.append(MiniField())
    story.append(Spacer(1, 8))
    story.append(
        callout(
            "About the threshold",
            "The falsifiability threshold is a practical benchmark, not a natural boundary. The exact line is somewhat arbitrary. What matters most is whether the claim moves toward public accountability or stays protected.",
            RUST,
            CREAM,
        )
    )

    section_page(story, "How the Score Works")
    story.append(
        PE(
            "The score is not the probability that God exists. It is an ordinal teaching estimate "
            "of how much the user is letting a specific promise face ordinary public checks."
        )
    )
    story.append(
        table(
            [
                ["Input", "Effect on score"],
                ["Study rigor", "Rises with clearer outcomes, comparison groups, blinding, preregistration, larger samples, public records, and replication."],
                ["Run willingness", "Scales the study by whether the user would actually submit the promise to the test."],
                ["Clean-failure willingness", "Scales the study by whether a fair negative result would lower confidence."],
                ["Escape-hatch drag", "Subtracts from the score when responses make poor results easier to dismiss."],
            ],
            [1.75 * inch, 4.75 * inch],
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        callout(
            "Simplified formula",
            "score = round(clamp(8 + study rigor x run multiplier x miss multiplier x 0.92 - excuse drag, 3, 96)). Run multiplier = 0.18 + willingness x 0.82. Miss multiplier = 0.20 + clean-failure willingness x 0.80.",
            BLUE_MID,
            BLUE_SOFT,
        )
    )
    story.append(
        table(
            [
                ["Score band", "Interpretation"],
                ["Under 35", "Protected from ordinary checks. The claim is mostly being held away from possible disappointment."],
                ["35-49", "Near the benchmark. The claim faces some evidence, but a poor result can still be softened or avoided."],
                ["50-71", "Meaningfully testable. A fair miss would begin to matter."],
                ["72+", "Exposed to clean disconfirmation. A strong negative result would be hard to redescribe as success."],
            ],
            [1.25 * inch, 5.25 * inch],
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        callout(
            "Calibration example",
            "An anecdote with modest willingness and low clean-failure posture stays near 9 or 10 out of 100. A large, replicated, blinded study with high willingness, high clean-failure posture, and no excuses can move far past the threshold.",
            RUST,
            CREAM,
        )
    )

    section_page(story, "Why Rigor Matters")
    story.append(
        PE(
            "Stories are not useless. They can suggest where to look. But stories usually hide "
            "misses, denominators, comparison groups, timing rules, and ordinary causes. The tool "
            "asks whether a story is allowed to grow into a fair check."
        )
    )
    story.append(
        table(
            [
                ["Claim type", "Bad study", "Better study"],
                ["Prayer", "A recovery story after prayer.", "Timestamped prayer requests, matched controls, blind outcome review, and missed requests included."],
                ["Healing", "A testimony after treatment.", "Before-and-after medical records, objective endpoints, independent clinician review, and comparison cases."],
                ["Future knowledge", "A remembered impression after the event.", "Public timestamped predictions scored by fixed rules against ordinary forecasting baselines."],
                ["Wisdom", "A choice later felt meaningful.", "Decision logs, predeclared alternatives, blind advice ratings, and prediction-market or expert baselines."],
                ["Behavior", "Changed-life stories from the group itself.", "Matched community data on crime, divorce, obesity, abuse response, restitution, and third-party audits."],
                ["Protection or health", "Survival stories from people who felt protected.", "Matched risk cohorts using public health, accident, hospitalization, death, and exposure data."],
            ],
            [1.25 * inch, 2.0 * inch, 3.25 * inch],
            small=True,
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        callout(
            "The clean question",
            "Can the promise survive this degree of scrutiny? If the answer is no, the claim may still be meaningful, but it should not be advertised as strong public evidence.",
            RUST,
            CREAM,
        )
    )

    story.append(subtitle("The evidence gradient"))
    story.append(
        table(
            [
                ["Evidence level", "Typical strength", "Why it moves the claim"],
                ["Anecdote", "Weak", "May be sincere, but usually lacks misses, controls, and denominators."],
                ["Case series or pilot", "Low to moderate", "Begins counting cases but may still lack blinding, matching, or replication."],
                ["Matched observational study", "Moderate", "Uses comparison groups and public data while still needing careful confounder control."],
                ["Preregistered controlled study", "Strong", "Defines outcomes and failure rules before results are known."],
                ["Highly replicated blinded study", "Very strong", "Makes it difficult to explain away a clean negative result as timing, memory, selection, or bias."],
            ],
            [1.45 * inch, 1.35 * inch, 3.7 * inch],
        )
    )

    section_page(story, "Promise-by-Promise Guide")
    story.append(
        PE(
            "Use these notes when deciding whether a study is actually testing the promise or "
            "merely collecting stories that could have happened under ordinary conditions."
        )
    )
    story.append(
        table(
            [
                ["Promise", "Cleaner test", "Common confounders"],
                ["Answered prayer", "Timestamped requests with matched non-prayer controls and blind outcome review.", "Natural recovery, treatment access, selective memory, family support, prior health, severity."],
                ["Divine healing", "Verified diagnosis, objective endpoints, medical records, independent clinicians, and comparison cases.", "Treatment, spontaneous remission, misdiagnosis, missing scans, survivorship bias."],
                ["Future knowledge", "Public timestamped predictions scored against fixed baselines.", "Vagueness, hindsight editing, base rates, multiple guesses, private timestamps."],
                ["Wisdom and insight", "Decision logs compared with ordinary advice, experts, forecasting baselines, or prediction markets such as Polymarket.", "Education, expertise, coaching, hindsight, resources, risk tolerance."],
                ["Better behavior", "Compare Christian communities with matched secular communities on crime, divorce, obesity, abuse response, restitution, and third-party audits.", "Age, income, education, culture, reporting rates, policing, healthcare access."],
                ["Divine protection", "Matched risk cohorts for accidents, violence, hospitalization, mortality, and exposure.", "Occupation, travel, safety training, local infrastructure, selection effects."],
                ["Reduced morbidity", "COVID infection, hospitalization, death, and long-COVID rates compared with matched controls.", "Vaccination, age, testing rates, exposure, healthcare access, baseline risk."],
                ["Unexpected longevity", "Verified identity and age data for substantial believer or prayer groups.", "Lifestyle, wealth, genetics, migration, identity records, age exaggeration."],
                ["Providential help", "Predeclared needs, timing windows, comparison baselines, and full miss-counting.", "Social networks, prior resources, flexible timing, selective reporting."],
            ],
            [1.25 * inch, 2.95 * inch, 2.3 * inch],
            small=True,
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        callout(
            "A fair comparison",
            "The comparison group must be chosen before results are known. Otherwise the user can search until a favorable contrast appears.",
            BLUE_MID,
            BLUE_SOFT,
        )
    )

    section_page(story, "The Commitment Step and Escape Hatches")
    story.append(
        PE(
            "The commitment step is the moral center of the tool. Before selecting excuses, the "
            "user writes what result would change their mind. A good pre-commitment is concrete, "
            "public enough for another person to evaluate, and stated before the data arrive."
        )
    )
    story.append(
        table(
            [
                ["Weak commitment", "Better commitment"],
                ["I would need to be convinced.", "If a preregistered matched study showed no advantage for prayed-for patients on the agreed outcome, I would lower confidence in this prayer claim."],
                ["I would know it when I saw it.", "If three public prediction rounds failed to beat the control baseline under fixed scoring rules, I would stop calling this future-knowledge claim public evidence."],
                ["God can work however he wants.", "I agree in advance that no advantage after controls counts against the claim as stated, even if I keep a private devotional interpretation."],
            ],
            [2.15 * inch, 4.35 * inch],
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        table(
            [
                ["Escape hatch", "Why it reduces falsifiability"],
                ["God's timing is unknowable", "It can move the success window after the outcome is known."],
                ["Not enough faith", "It can reinterpret failure as the subject's fault rather than evidence against the claim."],
                ["Do not test God", "It blocks testing after a concrete earthly claim has already been offered."],
                ["The result is spiritually hidden", "It shifts an observable claim into an invisible one."],
                ["Any outcome is an answer", "It makes success and failure confirm equally."],
            ],
            [2.05 * inch, 4.45 * inch],
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        callout(
            "A humane reading",
            "Selecting an escape hatch does not mean the person is dishonest. It means the claim is carrying less public evidential force than its rhetoric may suggest.",
            RUST,
            CREAM,
        )
    )

    section_page(story, "Using Results, Reports, and AI Review")
    story.append(
        PE(
            "The tool has two levels of result. The active-promise result explains the current "
            "claim. The suite-wide result asks whether the user's overall stance across all "
            "promises is open to clean disconfirmation or mostly protected rhetoric."
        )
    )
    story.append(
        table(
            [
                ["Feature", "Purpose"],
                ["Active result", "Summarizes the current promise's score, study, willingness, clean-failure posture, escape hatches, and personal-and-active-God question."],
                ["Suite-wide stance result", "Reviews every promise at once so the user can see whether openness is consistent or selective."],
                ["Promise field map", "A chart that makes patterns visible: higher points are more exposed, larger points use stronger studies, darker rings show excuse drag, and the yellow halo marks the active promise."],
                ["Printable report", "Creates a classroom or debate-prep handout with commitments, score drivers, confounders, outcome rules, and discussion questions."],
                ["AI Review prompt", "Packages the active claim or all claims into a comprehensive prompt for deeper analysis by another AI."],
            ],
            [1.65 * inch, 4.85 * inch],
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        callout(
            "AI Review is a handoff, not an oracle",
            "Ask the AI to check study design, confounders, clean-failure rules, and whether the stance really fits the claim that a personal God is active in earthly life. Then inspect the answer critically.",
            BLUE_MID,
            BLUE_SOFT,
        )
    )
    story.append(subtitle("How to use JSON"))
    story.append(
        PE(
            "The hidden JSON section preserves the user's selections in a structured form. It can "
            "be saved with a debate note, loaded later, or pasted into an analysis tool so another "
            "reader can review the exact settings rather than a vague summary."
        )
    )

    section_page(story, "Classroom and Debate Use")
    story.append(
        bullet_list(
            [
                "Choose one promise at a time. Do not let the discussion drift to every doctrine at once.",
                "Ask both sides to write the clean-miss rule before reviewing data or anecdotes.",
                "Treat stories as leads, not as final evidence for a general promise.",
                "Use the printable report when the group needs a shared record of commitments.",
                "Distinguish devotional meaning from public evidence. A claim can be meaningful without being testable.",
                "Return to the question: what is this specific promise allowed to risk?",
            ],
            "Body",
        )
    )
    story.append(
        callout(
            "Facilitator norm",
            "The strongest discussion is not the one where someone feels trapped. It is the one where everyone can see what kind of claim is actually being made.",
            RUST,
            CREAM,
        )
    )

    story.append(subtitle("Common objections"))
    story.append(
        table(
            [
                ["Question", "Helpful reply"],
                ["Is this testing God?", "The tool does not demand that God perform. It asks whether a human claim about earthly effects is being treated as checkable."],
                ["What if God is free?", "Freedom can explain why an effect is not guaranteed. It does not automatically make every public promise evidentially strong."],
                ["What if no is still an answer?", "That may be devotional language. But if yes, no, delay, and silence all confirm equally, the earthly effect is no longer testable."],
                ["Are anecdotes useless?", "No. They can suggest what to study. They are weak evidence for a general promise because they usually hide misses and denominators."],
                ["Is this scientism?", "No. The tool applies ordinary checks only to claims that already say something observable happens in earthly life."],
                ["What if sincerity matters?", "Then sincerity must be defined before results are known. Otherwise failure can always be blamed on hidden insincerity."],
            ],
            [1.75 * inch, 4.75 * inch],
            small=True,
        )
    )

    section_page(story, "Quick Worksheet")
    story.append(
        PE(
            "Use this page as a printable companion. It is intentionally simple: a clear claim, "
            "a fair study, a clean miss, ordinary causes to control, and an honest result rule."
        )
    )
    worksheet_rows = [
        ["1. Promise being tested", ""],
        ["2. Observable outcome", ""],
        ["3. Comparison group", ""],
        ["4. Study type and data source", ""],
        ["5. What would count for the claim?", ""],
        ["6. What would count against the claim?", ""],
        ["7. What would be neutral or too messy?", ""],
        ["8. Ordinary confounders to control", ""],
        ["9. Escape hatches I would be tempted to use", ""],
        ["10. What result would change my mind?", ""],
    ]
    t = Table(
        [[P(row[0], "TableBody"), P(row[1], "TableBody")] for row in worksheet_rows],
        colWidths=[2.2 * inch, 4.3 * inch],
        rowHeights=[0.42 * inch] * len(worksheet_rows),
        hAlign="LEFT",
    )
    t.setStyle(
        TableStyle(
            [
                ("BOX", (0, 0), (-1, -1), 0.55, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.35, LINE),
                ("BACKGROUND", (0, 0), (0, -1), SOFT),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    story.append(t)
    story.append(Spacer(1, 10))
    story.append(
        callout(
            "Final reminder",
            "The tool does not decide every theological question. It simply asks whether earthly promise claims are being exposed to the ordinary feedback they appear to invite.",
            BLUE_MID,
            BLUE_SOFT,
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        callout(
            "Closing question",
            "Am I willing for my confidence to be shaped by the world my claim says God is acting in?",
            RUST,
            CREAM,
        )
    )

    return story


def build_pdf():
    doc = SimpleDocTemplate(
        str(OUTPUT_PDF),
        pagesize=letter,
        leftMargin=0.72 * inch,
        rightMargin=0.72 * inch,
        topMargin=0.72 * inch,
        bottomMargin=0.62 * inch,
        title="Earthly Promise Test Field Manual",
        author="Crosshairs Audit Lab",
        subject="Guide to the value and use of the Earthly Promise Test Field",
    )
    doc.build(build_story(), onFirstPage=on_first_page, onLaterPages=on_later_pages)
    print(OUTPUT_PDF)


if __name__ == "__main__":
    build_pdf()

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
OUTPUT_PDF = OUTPUT_DIR / "promising-gods-mirror-manual.pdf"

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
            fontSize=36,
            leading=40,
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
            fontSize=13.5,
            leading=19,
            textColor=MUTED,
            alignment=TA_LEFT,
            spaceAfter=17,
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


class MirrorArc(Flowable):
    def __init__(self):
        super().__init__()
        self.width = 6.5 * inch
        self.height = 1.3 * inch

    def draw(self):
        c = self.canv
        w = self.width
        h = self.height
        labels = [
            ("FICTIVE VERSE", BLUE_MID),
            ("FLAT RESULT", GREEN),
            ("COLLAPSE LINE", RUST),
            ("BIBLE PARALLELS", GOLD_DARK),
        ]
        box_w = (w - 20) / 4
        y = h * 0.38
        for index, (label, color) in enumerate(labels):
            x = index * (box_w + 6)
            c.setFillColor(color)
            c.roundRect(x, y, box_w, h * 0.34, 10, fill=1, stroke=0)
            c.setFillColor(WHITE)
            c.setFont("Helvetica-Bold", 8.2)
            c.drawCentredString(x + box_w / 2, y + h * 0.13, label)
            if index < len(labels) - 1:
                c.setStrokeColor(LINE)
                c.setLineWidth(1.2)
                c.line(x + box_w, y + h * 0.17, x + box_w + 6, y + h * 0.17)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 7.2)
        c.drawCentredString(
            w / 2,
            9,
            "The mirror fixes the result first, then asks where the rhetoric stops being a real public promise.",
        )


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
    canvas.drawString(doc.leftMargin, PAGE_HEIGHT - 27, "Promising Gods Mirror Manual")
    canvas.setFillColor(RUST_DARK)
    canvas.drawRightString(PAGE_WIDTH - doc.rightMargin, PAGE_HEIGHT - 27, "Crosshairs Audit Lab")
    canvas.setStrokeColor(LINE)
    canvas.line(doc.leftMargin, 43, PAGE_WIDTH - doc.rightMargin, 43)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7.7)
    canvas.drawString(
        doc.leftMargin,
        28,
        "A guide for tracing how public promise language retreats when the earthly result stays flat.",
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
    return table(rows, [0.38 * inch, 6.12 * inch], header=False, tint=SOFT)


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
        colWidths=[1.55 * inch, 4.95 * inch],
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
    for heading_text, body, tint in cards:
        inner = [P(f"<b>{escape(heading_text)}</b>", "CalloutTitle"), P(escape(body), "BodySmall")]
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


def section_page(story, heading_text):
    story.append(PageBreak())
    story.append(title(heading_text))


def build_story():
    story = []

    story.append(Spacer(1, 0.55 * inch))
    story.append(
        Table(
            [[P("CROSSHAIRS AUDIT LAB", "CoverKicker"), HaloMark(54)]],
            colWidths=[5.75 * inch, 0.75 * inch],
        )
    )
    story.append(Spacer(1, 1.05 * inch))
    story.append(P("Promising Gods<br/>Mirror", "CoverTitle"))
    story.append(
        P(
            "A manual for sincere seekers, teachers, and discussion leaders who want to know when a public promise has quietly become protected reinterpretation.",
            "CoverSub",
        )
    )
    story.append(
        callout(
            "Core question",
            "When a verse promises a visible earthly advantage but matched public outcomes stay flat, where does the promise cease to be a real promise and become reinterpretation, comfort, or rhetorical retreat?",
            RUST,
            CREAM,
        )
    )
    story.append(Spacer(1, 0.35 * inch))
    story.append(
        PE(
            "This manual explains why the tool begins with fictive gods, how the collapse ladder works, how the reveal is meant to pressure asymmetry, and how to carry the same standard into Earthly Promise Test Field. It is not a verdict on Christianity. It is a disciplined way to ask whether the same rhetoric would still be called a promise if the scripture were unfamiliar."
        )
    )

    section_page(story, "How to Use This Manual")
    story.append(
        PE(
            "Read the first two pages before launching the mirror for the first time. Use the middle sections while working through cases or teaching the tool. Use the final sections when preparing a class discussion, printed handout, or transition into the companion field."
        )
    )
    story.append(
        table(
            [
                ["Part", "What it gives you"],
                ["Purpose", "Why the tool uses invented scriptures and flat results instead of beginning with explicit biblical claims."],
                ["Four-step flow", "Meet the gods, choose a promise, set the collapse line, and reveal the Christian parallels."],
                ["Collapse ladder", "How each rung marks a deeper retreat from a public promise into subgroup narrowing, hindsight rescue, comfort, or denial."],
                ["Reveal and report", "How to read the summary boxes, report output, and end-of-tool handoff responsibly."],
                ["Companion use", "How to carry the same line into Earthly Promise Test Field without relaxing the standard for familiar verses."],
            ],
            [1.45 * inch, 5.05 * inch],
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        callout(
            "Best starting move",
            "Do not begin by debating a whole religion. Begin with one public promise, one flat result, and one honest question: where would I stop calling this a real promise if the scripture were unfamiliar?",
            BLUE_MID,
            BLUE_SOFT,
        )
    )

    story.append(subtitle("1. Why This Tool Exists"))
    story.append(
        PE(
            "People often judge familiar scriptures and unfamiliar scriptures by different standards. A verse from an invented holy book can look obviously overclaimed, while a parallel biblical verse is immediately surrounded by devotion, memory, reverence, and context-sensitive repair. The mirror creates distance long enough for a cleaner first judgment."
        )
    )
    story.append(
        PE(
            "The tool is built around a narrow pressure point. It does not ask whether comfort is real, whether God exists, or whether sacred texts can carry symbolic meaning. It asks whether public promise language should still be treated as public promise language when matched earthly outcomes fail to show the promised advantage."
        )
    )
    story.append(
        callout(
            "The mirror is not asking",
            "Is inward comfort worthless? It is asking whether inward comfort can honestly replace a failed public promise while the rhetoric still presents itself as evidence of divine action in ordinary life.",
            RUST,
            CREAM,
        )
    )

    section_page(story, "Why the Tool Uses Invented Gods")
    story.append(
        three_cards(
            [
                (
                    "Distance lowers reflex",
                    "Invented gods interrupt the immediate instinct to rescue familiar scripture before the promise has been judged on its own public force.",
                    BLUE_SOFT,
                ),
                (
                    "Flat results fix the pressure",
                    "Because every case already includes a matched flat result, the task is not data-hunting. The task is naming where the rhetoric stops being a real-world promise.",
                    GREEN_SOFT,
                ),
                (
                    "The reveal tests asymmetry",
                    "Only after the user has judged the fictive promise does the tool show biblical parallels that are often used in the same public-promise domains.",
                    GOLD_SOFT,
                ),
            ]
        )
    )
    story.append(Spacer(1, 10))
    story.append(
        bullet_list(
            [
                "The fictive verses are intentionally recognizable in structure so the user feels the pull of familiar promise language without the immediate authority of the Bible.",
                "The three gods cover the same broad promise domains often discussed in Christian apologetics: prayer, healing, protection, provision, wisdom, prophecy, behavior, reduced morbidity, and longevity.",
                "The reveal does not claim full contextual identity between every pair of verses. It asks whether the same phrase-patterns are nevertheless being invoked as promises in ordinary Christian life.",
            ]
        )
    )
    story.append(
        callout(
            "The pedagogical wager",
            "If a user sets a stricter collapse line for the invented scripture than for the biblical parallel, the difference is probably coming from familiarity rather than from a stable public standard.",
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
                    "Testing whether public promise language still deserves to be called a promise once the promised earthly effect stays flat.",
                    "Arguing that every religious statement must be measurable or that symbolic faith-language is automatically dishonest.",
                ],
                [
                    "Small-group work on asymmetry, selective rescue, rhetorical downgrading, and the distinction between comfort and public evidence.",
                    "Mocking grief, testimonies, or devotional meaning.",
                ],
                [
                    "Preparing users to enter Earthly Promise Test Field with a cleaner standard already in hand.",
                    "Pretending the fictive cases settle every contextual question about the biblical parallels by themselves.",
                ],
            ],
            [3.25 * inch, 3.25 * inch],
        )
    )

    section_page(story, "The Four-Step Workflow")
    story.append(
        numbered_rows(
            [
                (
                    "1",
                    "Meet the gods",
                    "Read the three invented deities and their public promise domains. The point is to begin away from biblical familiarity.",
                ),
                (
                    "2",
                    "Choose a promise",
                    "Select one fictive verse and study its public claim, ordinary earthly test, observed result, and required retreat line.",
                ),
                (
                    "3",
                    "Set the collapse line",
                    "Choose the first rung where you would say the verse is no longer functioning as a real earthly promise.",
                ),
                (
                    "4",
                    "Reveal the Christian parallels",
                    "After all nine cases are judged, compare the collapse line you set for invented scripture with familiar biblical verses often used in the same domains.",
                ),
            ]
        )
    )
    story.append(Spacer(1, 8))
    story.append(MirrorArc())
    story.append(Spacer(1, 8))
    story.append(
        callout(
            "Why the result comes before the ladder",
            "The mirror removes the temptation to keep searching for one more anecdote. The fixed flat result means the only remaining question is what rhetorical retreat you are willing to allow.",
            BLUE_MID,
            BLUE_SOFT,
        )
    )

    story.append(subtitle("Reading the main controls"))
    story.append(
        table(
            [
                ["Control", "Meaning"],
                ["Current case", "The promise currently driving the verse, public claim, test, stop line, and live verdict."],
                ["Fictive verse", "The invented scripture that mirrors a familiar public-promise style without carrying biblical authority."],
                ["Public claim", "The ordinary-language effect the verse appears to promise in public life."],
                ["Ordinary earthly test", "A plausible matched study or public comparison that would count if the promise really produced the stated effect."],
                ["Observed result", "A fixed flat outcome. The mirror is built around this pressure point on purpose."],
                ["Current stop line", "The rung you selected as the first point where the promise stops being a real earthly promise."],
                ["Verdict box", "The tool's summary of whether the verse now fails as a promise, survives only as comfort, or survives only by denying that it ever made a public promise."],
                ["Summary ledger", "The running totals across all nine cases: fails as promise, survives only as comfort, or now denied as a public promise."],
                ["Printable report", "A shareable summary of your stop lines, verdicts, and the biblical parallels with actual verse text included."],
            ],
            [1.55 * inch, 4.95 * inch],
        )
    )

    section_page(story, "The Collapse Ladder")
    story.append(
        PE(
            "Every rung marks a further concession. The first three rungs still assume that the verse was making a public promise and then progressively weaken the conditions under which that promise may still count. The fourth rung changes the promise into comfort. The fifth preserves the wording only by denying that any public promise was being made at all."
        )
    )
    story.append(
        table(
            [
                ["Rung", "What changes", "Why it matters"],
                ["1. The real-world result is gone", "The promised effect is not showing up better than ordinary life or matched comparison cases.", "If you stop here, the promise has already failed as a public promise."],
                ["2. Only a smaller special group counts", "The promise survives only by shrinking to a more sincere, more devout, or more approved subgroup.", "A promise that must shrink after the result arrives is already weaker than its original rhetoric."],
                ["3. Misses are explained away afterward", "Hidden sincerity, hidden sin, or mysterious timing are used to rescue every miss after the fact.", "A claim that can reinterpret every failure no longer risks public correction."],
                ["4. Now it means comfort instead", "The promise stops naming a visible earthly effect and becomes reassurance, presence, symbolism, or inward endurance.", "This is the first remaining escape after the flat result. Comfort may remain real, but the public promise is gone."],
                ["5. Nothing public was promised", "The wording is protected only by denying that the verse ever made an earthly prediction in the first place.", "This is a full rhetorical retreat from the original public claim, not a successful public promise."],
            ],
            [0.95 * inch, 2.55 * inch, 3.0 * inch],
            small=True,
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        callout(
            "The mirror's main pressure point",
            "Because the flat result is already on the table, rung 4 is the first place where the verse can still be kept alive only as comfort. Earlier stops mean the promise failed even before that comfort-only retreat. A rung 5 stop means the user preserved the wording only by denying that it was ever a public promise.",
            RUST,
            CREAM,
        )
    )

    story.append(subtitle("Why every case is flat"))
    story.append(
        PE(
            "The fixed flat result is deliberate. The tool is not designed to compare one study against another or to invite endless objections about whether a better dataset might someday appear. It is designed to isolate the interpretive move that happens after a promise has not shown the promised public effect."
        )
    )
    story.append(
        bullet_list(
            [
                "Flat outcomes keep the teaching focus on redefinition rather than on case-by-case wrangling about whether one more anecdote might rescue the claim.",
                "Several cases include highly committed subgroups in the flat result already, so subgroup rescue has to be defended rather than assumed.",
                "The tool does not claim that every real-world dataset is final. It claims that a promise being used as public evidence should be able to name what a fair flat result would mean before the rescue language begins.",
            ]
        )
    )

    section_page(story, "Reading the Reveal and the Report")
    story.append(
        PE(
            "The reveal stays locked until all nine cases receive stop lines. This slows the transition into biblical familiarity. Once unlocked, the reveal shows the fictive verse, your stop line, the mirror's verdict, and the Christian parallels often invoked in the same promise domain."
        )
    )
    story.append(
        table(
            [
                ["Element", "How to read it"],
                ["Fails as a real promise", "Your line says the verse already failed before the comfort-only fallback. The flat result defeats the public promise on your own standard."],
                ["Survives only as comfort", "Your line allows the wording to remain as reassurance, symbolism, or inward meaning, but no longer as a public earthly promise."],
                ["Now denied as a public promise", "Your line preserves the wording only by denying that it was making a real-world promise in the first place."],
                ["Christian parallels", "The familiar biblical verses often used in the same domain, shown with both note and verse text so the comparison is visible without needing a separate Bible lookup."],
                ["Printable report", "A classroom-ready or discussion-ready summary of all nine cases, including the biblical parallels and the exact language of your judgments."],
            ],
            [1.45 * inch, 5.05 * inch],
            small=True,
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        callout(
            "What the report is good for",
            "Use the report when you want the class or conversation to inspect the reasoning after the clicks are over. The report preserves the stop line, the verdict, and the biblical parallels together so the discussion does not drift back into memory or tone alone.",
            BLUE_MID,
            BLUE_SOFT,
        )
    )

    section_page(story, "Companion Use with Earthly Promise Test Field")
    story.append(
        PE(
            "Promising Gods Mirror is not meant to replace Earthly Promise Test Field. It is meant to prepare the user for it. The mirror freezes the outcome and asks where promise-language collapses. The field then lets the user choose real Christian promise domains, select stronger or weaker studies, name escape hatches, and see how exposed the claim is to public correction."
        )
    )
    story.append(
        table(
            [
                ["Use the mirror when...", "Use the field when..."],
                [
                    "You need distance from biblical familiarity before judging the rhetoric of a promise.",
                    "You want to test actual Christian promise claims with study choice, willingness-to-run, clean-failure posture, and excuse drag all visible.",
                ],
                [
                    "You want a quicker asymmetry check.",
                    "You want a broader audit of how much a promise is exposed to real-world evidence.",
                ],
                [
                    "You want students first to admit where invented promise language ceases to be a promise at all.",
                    "You want students to carry that same line into familiar Christian claims without changing the standard midstream.",
                ],
            ],
            [3.25 * inch, 3.25 * inch],
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        callout(
            "Recommended sequence",
            "Run several mirror cases first, then move immediately into Earthly Promise Test Field while the collapse line is still emotionally fresh. The follow-up question is simple: will the same line be kept now that the verses are biblical?",
            RUST,
            CREAM,
        )
    )

    section_page(story, "Honest Use and Common Misuse")
    story.append(
        bullet_list(
            [
                "Do not use the tool as a shortcut to sneering at comfort, prayer, or scripture. The point is to separate categories honestly, not to humiliate devotion.",
                "Do not use the reveal as if it proves every biblical context is identical to the fictive verse. The tighter claim is that similar promise language is often invoked in similar public ways.",
                "Do not hide behind inventedness. If the fictive verse collapses for you, ask what justifies exempting the biblical parallel from the same line.",
                "Do not confuse public-evidence criticism with metaphysical disproof. A promise can fail as public evidence without settling every larger theological question.",
                "Do not let the tool stop at deconstruction. Its best use is transfer: the user should leave with a more stable standard for the companion field and for later discussions.",
            ],
            "Body",
        )
    )
    story.append(
        callout(
            "Mirror not weapon",
            "The healthiest use of the tool is self-implicating. It asks, \"Would I still call this a promise if the verse came from someone else's holy book?\"",
            BLUE_MID,
            BLUE_SOFT,
        )
    )
    story.append(Spacer(1, 18))
    story.append(P("Manual PDF generated from scripts/generate_promising_gods_manual.py.", "Tiny"))

    return story


def build_pdf():
    doc = SimpleDocTemplate(
        str(OUTPUT_PDF),
        pagesize=letter,
        leftMargin=0.72 * inch,
        rightMargin=0.72 * inch,
        topMargin=0.72 * inch,
        bottomMargin=0.72 * inch,
        title="Promising Gods Mirror Manual",
        author="OpenAI Codex",
        subject="Manual for the Promising Gods Mirror tool",
    )
    doc.build(build_story(), onFirstPage=on_first_page, onLaterPages=on_later_pages)


if __name__ == "__main__":
    build_pdf()

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
OUTPUT_PDF = OUTPUT_DIR / "earthly-promise-test-field-curriculum.pdf"

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
            fontSize=34,
            leading=38,
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
            fontSize=13,
            leading=18.5,
            textColor=MUTED,
            alignment=TA_LEFT,
            spaceAfter=15,
        )
    )
    styles.add(
        ParagraphStyle(
            name="H1",
            parent=styles["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=21,
            leading=25,
            textColor=BLUE,
            spaceBefore=4,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="H2",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=13.2,
            leading=16,
            textColor=RUST_DARK,
            spaceBefore=7,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.6,
            leading=13.3,
            textColor=INK,
            spaceAfter=5.5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodySmall",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.05,
            leading=10.4,
            textColor=INK,
            spaceAfter=3.5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Muted",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.7,
            leading=11.4,
            textColor=MUTED,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Tiny",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=6.7,
            leading=8.2,
            textColor=MUTED,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableHead",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=7.15,
            leading=8.7,
            textColor=WHITE,
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableBody",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=6.75,
            leading=8.4,
            textColor=INK,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableBodyLarge",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=7.55,
            leading=9.6,
            textColor=INK,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CardTitle",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9.7,
            leading=11.6,
            textColor=BLUE,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Center",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=8,
            leading=10,
            textColor=BLUE,
            alignment=TA_CENTER,
        )
    )
    return styles


STYLES = build_styles()


def P(text: str, style: str = "Body") -> Paragraph:
    return Paragraph(text, STYLES[style])


def PE(text: str, style: str = "Body") -> Paragraph:
    return P(escape(text), style)


def heading(text: str) -> Paragraph:
    return PE(text, "H1")


def subheading(text: str) -> Paragraph:
    return PE(text, "H2")


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


class CurriculumMap(Flowable):
    def __init__(self):
        super().__init__()
        self.width = 6.5 * inch
        self.height = 1.25 * inch

    def draw(self):
        c = self.canv
        w = self.width
        h = self.height
        colors_by_step = [BLUE_MID, GREEN, RUST, GOLD_DARK, BLUE]
        labels = ["Claim", "Study", "Commit", "Excuses", "Result"]
        for i, label in enumerate(labels):
            x = i * (w / 5)
            c.setFillColor(colors_by_step[i])
            c.roundRect(x + 3, h * 0.34, w / 5 - 6, h * 0.42, 9, fill=1, stroke=0)
            c.setFillColor(WHITE)
            c.setFont("Helvetica-Bold", 8.2)
            c.drawCentredString(x + w / 10, h * 0.5, label.upper())
            if i < 4:
                c.setStrokeColor(LINE)
                c.setLineWidth(1.2)
                c.line(x + w / 5 - 2, h * 0.55, x + w / 5 + 7, h * 0.55)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 7.2)
        c.drawCentredString(w / 2, 9, "The curriculum repeats this arc until students can use it without prompting.")


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
    canvas.setFont("Helvetica", 8.6)
    canvas.drawString(doc.leftMargin, PAGE_HEIGHT - 27, "Earthly Promise Test Field Curriculum")
    canvas.setFillColor(RUST_DARK)
    canvas.drawRightString(PAGE_WIDTH - doc.rightMargin, PAGE_HEIGHT - 27, "Crosshairs Audit Lab")
    canvas.setStrokeColor(LINE)
    canvas.line(doc.leftMargin, 43, PAGE_WIDTH - doc.rightMargin, 43)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(doc.leftMargin, 28, "A rigorous small-group curriculum for honest seekers.")
    canvas.drawRightString(PAGE_WIDTH - doc.rightMargin, 28, str(canvas.getPageNumber()))
    canvas.restoreState()


def table(rows, col_widths, header=True, tint=SOFT, large=False):
    body_style = "TableBodyLarge" if large else "TableBody"
    data = []
    for r, row in enumerate(rows):
        style = "TableHead" if header and r == 0 else body_style
        data.append([cell if hasattr(cell, "wrap") else P(str(cell), style) for cell in row])
    t = Table(data, colWidths=col_widths, repeatRows=1 if header else 0, hAlign="LEFT")
    commands = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BOX", (0, 0), (-1, -1), 0.55, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.35, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("BACKGROUND", (0, 0), (-1, -1), colors.white),
    ]
    if header:
        commands.append(("BACKGROUND", (0, 0), (-1, 0), BLUE))
    else:
        commands.append(("BACKGROUND", (0, 0), (-1, -1), tint))
    t.setStyle(TableStyle(commands))
    return t


def callout(label, body, accent=BLUE_MID, tint=SOFT):
    t = Table(
        [[P(f"<b>{escape(label)}</b>", "CardTitle"), PE(body, "BodySmall")]],
        colWidths=[1.5 * inch, 5.0 * inch],
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


def cards(items):
    cells = []
    for title, body, tint in items:
        cells.append([PE(title, "CardTitle"), PE(body, "BodySmall")])
    t = Table([cells], colWidths=[2.12 * inch, 2.12 * inch, 2.12 * inch], hAlign="LEFT")
    commands = [
        ("BOX", (0, 0), (-1, -1), 0.55, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.55, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]
    for i, item in enumerate(items):
        commands.append(("BACKGROUND", (i, 0), (i, 0), item[2]))
    t.setStyle(TableStyle(commands))
    return t


def compact_cards(items):
    cells = []
    for title, body, tint in items:
        cells.append([PE(title, "CardTitle"), PE(body, "Tiny")])
    t = Table([cells], colWidths=[1.58 * inch] * len(items), hAlign="LEFT")
    commands = [
        ("BOX", (0, 0), (-1, -1), 0.45, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.45, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]
    for i, item in enumerate(items):
        commands.append(("BACKGROUND", (i, 0), (i, 0), item[2]))
    t.setStyle(TableStyle(commands))
    return t


def para_lines(items, style="TableBodyLarge"):
    return P("<br/>".join(f"- {escape(item)}" for item in items), style)


def worksheet_table(headers, row_count, col_widths, row_height):
    rows = [[PE(header, "TableHead") for header in headers]]
    rows.extend([[PE("", "TableBodyLarge") for _ in headers] for _ in range(row_count)])
    t = Table(
        rows,
        colWidths=col_widths,
        rowHeights=[0.32 * inch] + [row_height] * row_count,
        hAlign="LEFT",
    )
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), BLUE),
                ("BOX", (0, 0), (-1, -1), 0.55, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.35, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return t


def bullet_list(items, style="BodySmall"):
    return ListFlowable(
        [ListItem(P(f"{escape(item)}", style), leftIndent=0) for item in items],
        bulletType="bullet",
        leftIndent=14,
        bulletFontName="Helvetica-Bold",
        bulletFontSize=7,
        bulletOffsetY=1.4,
        spaceBefore=1,
        spaceAfter=5,
    )


def new_page(story, title):
    story.append(PageBreak())
    story.append(heading(title))


SESSIONS = [
    {
        "number": 1,
        "title": "Meaning, Evidence, and the Scope of the Tool",
        "question": "When is a spiritual claim personal meaning, and when is it public evidence?",
        "outcomes": [
            "Distinguish private interpretation from public earthly promise.",
            "Explain why the tool tests human claims about observable effects, not God as such.",
            "Name the emotional risks of inquiry without treating those risks as evidence.",
        ],
        "flow": [
            ("0-10", "Opening norm", "Students write one sentence beginning: \"I want to be honest enough to...\""),
            ("10-25", "Claim sort", "Sort cards into private meaning, public earthly claim, and mixed claim."),
            ("25-45", "Mini-lesson", "Introduce earthly promise, falsifiability, clean miss, escape hatch, and confounder."),
            ("45-65", "Boundary practice", "Rewrite five claims so each says what kind of claim it is."),
            ("65-82", "Small-group debrief", "Ask which claims felt threatening to clarify and why."),
            ("82-90", "Exit ticket", "One claim I can value without using as public evidence is..."),
        ],
        "teacher": "Move slowly. Students may hear \"testable\" as \"valuable\". Keep separating value, truth, and public evidential use.",
        "artifact": "Claim-sorting sheet with three examples and one self-chosen promise.",
        "homework": "Collect three real-world statements about prayer, healing, guidance, or protection. Label each as private, public, or mixed.",
    },
    {
        "number": 2,
        "title": "From Vague Promise to Testable Claim",
        "question": "What exactly is being claimed?",
        "outcomes": [
            "Turn vague God-language into outcome, population, timeframe, and comparison.",
            "Avoid over-narrowing a claim so it becomes trivial.",
            "Avoid over-broadening a claim so it becomes untestable.",
        ],
        "flow": [
            ("0-12", "Warm-up", "Students improve: \"God answers prayer\" without making it hostile or vague."),
            ("12-30", "Claim surgery", "Use the four-part claim frame: who, outcome, timeframe, comparison."),
            ("30-50", "Gallery repair", "Teams rotate through vague claims and leave cleaner rewrites."),
            ("50-68", "Teacher challenge", "Ask whether each rewrite still preserves the original claim's force."),
            ("68-83", "Tool preview", "Map rewrites to the promise categories in the app."),
            ("83-90", "Exit ticket", "Write one clean promise in 30 words or fewer."),
        ],
        "teacher": "The art is preserving the claim's intended meaning while removing fog. Do not let students win by shrinking the promise until nothing is at stake.",
        "artifact": "One promise statement with outcome, population, timeframe, and comparison group.",
        "homework": "Rewrite one collected claim into a clean, testable form and bring a one-sentence explanation of what was lost or gained.",
    },
    {
        "number": 3,
        "title": "The Evidence Gradient",
        "question": "Why is a story not the same as a study?",
        "outcomes": [
            "Place evidence types from anecdote to replicated blinded study.",
            "Explain denominators, misses, comparison groups, blinding, preregistration, and replication.",
            "Upgrade weak evidence without mocking sincerity.",
        ],
        "flow": [
            ("0-10", "Story respect", "Students name what a story can legitimately do: suggest, comfort, motivate, point."),
            ("10-28", "Gradient build", "Arrange evidence cards from weakest to strongest and defend the ordering."),
            ("28-52", "Bad study / better study", "Teams upgrade one bad study into a better study in two rounds."),
            ("52-70", "Rigor stations", "Each station adds one feature: controls, blinding, preregistration, sample, replication."),
            ("70-84", "Can it survive?", "Ask: can the promise survive this degree of scrutiny?"),
            ("84-90", "Exit ticket", "The single biggest weakness in my original evidence was..."),
        ],
        "teacher": "Keep repeating that stories can be meaningful leads. The question is whether they can carry a general public promise.",
        "artifact": "Bad-study / better-study comparison for one promise.",
        "homework": "Find one anecdote online or from memory and list the missing denominator, misses, and comparison group.",
    },
    {
        "number": 4,
        "title": "The Clean Miss",
        "question": "What result would change your mind?",
        "outcomes": [
            "Write a clean-miss rule before seeing results.",
            "Distinguish a disconfirming result from an ambiguous or underpowered result.",
            "Recognize why pre-commitment protects honesty.",
        ],
        "flow": [
            ("0-12", "Moral warm-up", "Students describe a time when moving the goalposts would have been unfair."),
            ("12-28", "Mini-lesson", "Teach counts for, counts against, and neutral."),
            ("28-50", "Commitment lab", "Students write weak and better versions of mind-change commitments."),
            ("50-65", "Peer audit", "Partners test whether another person could evaluate the commitment."),
            ("65-80", "Pressure test", "Teacher introduces disappointing hypothetical results; students decide whether the rule holds."),
            ("80-90", "Exit ticket", "A fair result that would lower my confidence in this claim is..."),
        ],
        "teacher": "This session is the hinge. Treat evasions gently but firmly. A vague mind-change rule is not yet a commitment.",
        "artifact": "Pre-commitment statement with counts-for, counts-against, and neutral result rules.",
        "homework": "Revise the pre-commitment after one day of reflection. Note whether the revision made the claim clearer or safer.",
    },
    {
        "number": 5,
        "title": "Confounders and Ordinary Causes",
        "question": "What ordinary factor could make this pattern appear?",
        "outcomes": [
            "Identify confounders by promise type.",
            "Explain why matched comparison groups matter.",
            "Design controls without assuming the claim is false in advance.",
        ],
        "flow": [
            ("0-10", "Opening puzzle", "Two groups have different outcomes. Students brainstorm causes besides the promise."),
            ("10-30", "Confounder map", "Introduce baseline risk, treatment access, exposure, age, income, culture, and reporting bias."),
            ("30-55", "Promise stations", "Healing, COVID morbidity, behavior, prophecy, wisdom, longevity, protection."),
            ("55-72", "Comparison design", "Students choose the fairest comparison group for each station."),
            ("72-84", "Japanese community example", "Discuss why secular comparison groups require careful matching."),
            ("84-90", "Exit ticket", "The confounder most likely to fool me is..."),
        ],
        "teacher": "Confounders are not debunking magic. They are ordinary explanations that must be controlled before a supernatural explanation gains public force.",
        "artifact": "Promise-specific confounder checklist.",
        "homework": "Pick one promise and list five confounders plus one control for each.",
    },
    {
        "number": 6,
        "title": "Escape Hatches and Protected Rhetoric",
        "question": "What explanation would make every result compatible with the claim?",
        "outcomes": [
            "Identify common escape hatches after poor results.",
            "Distinguish sincere theological interpretation from public evidence.",
            "Explain how escape hatches create drag in the tool.",
        ],
        "flow": [
            ("0-12", "Opening distinction", "A reason can be emotionally understandable and still reduce testability."),
            ("12-28", "Escape hatch taxonomy", "God's timing, not enough faith, do not test God, hidden result, any outcome is an answer."),
            ("28-55", "Escape Hatch Court", "One team defends a miss; one team asks whether the claim still risks anything."),
            ("55-70", "Tool demo", "Show how selected excuses pull a promise left through drag."),
            ("70-84", "Rewrite challenge", "Students convert one escape hatch into a narrower, honest claim."),
            ("84-90", "Exit ticket", "The escape hatch I am most tempted by is..."),
        ],
        "teacher": "Do not equate escape hatches with bad faith. Focus on function: does the explanation leave any possible miss?",
        "artifact": "Escape-hatch analysis for the student's chosen promise.",
        "homework": "Write a paragraph distinguishing a devotional interpretation from a public evidence claim.",
    },
    {
        "number": 7,
        "title": "Study Design Studio",
        "question": "What would a fair, feasible first test look like?",
        "outcomes": [
            "Build a study with outcome, comparison, sample, blinding or review, miss rule, and confounder controls.",
            "Evaluate feasibility without lowering rigor into uselessness.",
            "Describe a replication path.",
        ],
        "flow": [
            ("0-10", "Design constraints", "A study must be fair, feasible, and able to disappoint the claim."),
            ("10-25", "Protocol anatomy", "Introduce outcome, population, comparison, data source, review method, miss rule, controls."),
            ("25-60", "Design sprint", "Teams build one protocol for healing, protection, wisdom, prophecy, behavior, morbidity, or longevity."),
            ("60-75", "Red-team review", "Other teams identify missing controls and possible hindsight repairs."),
            ("75-86", "Revision", "Teams improve protocols after critique."),
            ("86-90", "Exit ticket", "The strongest part of our study is... The weakest is..."),
        ],
        "teacher": "Students should feel the difference between impossible perfection and lazy anecdotes. Good pilots can be simple and still honest.",
        "artifact": "One-page study protocol.",
        "homework": "Prepare the protocol for entry into the Earthly Promise Test Field.",
    },
    {
        "number": 8,
        "title": "Using the Earthly Promise Test Field",
        "question": "What happens when the claim enters the field?",
        "outcomes": [
            "Enter a promise, study, willingness, clean-failure posture, and escape hatches.",
            "Read active result, field position, and promise field map.",
            "Explain why the score is exposure to public accountability, not probability of God.",
        ],
        "flow": [
            ("0-12", "Orientation", "Walk through active promise, study, run, miss, drag, and score."),
            ("12-35", "Prediction first", "Students predict where their claim will land before using the tool."),
            ("35-62", "Tool lab", "Students enter their protocol and adjust only settings they would honestly accept."),
            ("62-76", "Map reading", "Compare all promises on the promise field map; identify patterns of selective openness."),
            ("76-86", "Result paragraph", "Students write what the result says and does not say."),
            ("86-90", "Exit ticket", "The setting that changed the result most was..."),
        ],
        "teacher": "Require students to interpret the score modestly. The field shows willingness to test; it does not declare metaphysical truth.",
        "artifact": "Tool report or screenshot plus a 150-word interpretation.",
        "homework": "Use the AI Review prompt and bring one useful critique and one questionable critique from the AI response.",
    },
    {
        "number": 9,
        "title": "Suite-Wide Stance and Personal Active God Claims",
        "question": "Does the overall stance fit the claim that God acts in earthly life?",
        "outcomes": [
            "Read the suite-wide result across all promises.",
            "Identify whether openness is consistent or selective.",
            "Discuss the personal-and-active-God question without overclaiming.",
        ],
        "flow": [
            ("0-10", "Opening contrast", "A claim can be loud in rhetoric and quiet in risk."),
            ("10-30", "Suite-wide build", "Students run all-promises result and observe protected, testable, and exposed promises."),
            ("30-52", "Pattern analysis", "Which promises are allowed to face evidence? Which are insulated? Why?"),
            ("52-70", "Personal active God discussion", "Ask what kind of earthly pattern would be expected if the promise is public evidence."),
            ("70-83", "Consistency challenge", "Students revise one protected promise or downgrade its evidential rhetoric."),
            ("83-90", "Exit ticket", "My most honest label for this promise now is..."),
        ],
        "teacher": "Keep students from totalizing. A protected score does not settle all theology; it only limits the evidential use of that earthly promise.",
        "artifact": "Suite-wide stance analysis with one revised claim label.",
        "homework": "Choose the capstone promise and assemble all prior artifacts.",
    },
    {
        "number": 10,
        "title": "Capstone Audit and Public Reflection",
        "question": "What is this specific promise allowed to risk?",
        "outcomes": [
            "Present a complete audit of one earthly promise.",
            "Receive critique without moving the goalposts.",
            "Reflect on how honest verification should shape future inquiry.",
        ],
        "flow": [
            ("0-10", "Presentation norms", "Critique the claim, not the person. Ask what would make it fairer."),
            ("10-55", "Capstone rounds", "Each student presents claim, study, confounders, clean miss, escape hatches, tool result, and reflection."),
            ("55-72", "Peer questions", "Peers ask one clarification, one rigor question, and one humility question."),
            ("72-82", "Revision minute", "Students revise one sentence in their audit after feedback."),
            ("82-90", "Closing circle", "Answer: Am I willing for my confidence to be shaped by the world my claim says God is acting in?"),
        ],
        "teacher": "The goal is not uniform conclusions. The goal is visible honesty: clear claims, fair tests, real miss-counting, and humble labels.",
        "artifact": "Final audit packet and two-minute oral defense.",
        "homework": "Optional: revise the packet into a shareable report for a mentor, parent, pastor, teacher, or debate partner.",
    },
]


SESSION_ENRICHMENTS = {
    1: {
        "materials": "Claim cards, three sorting signs, sticky notes, one sample testimony, one sample public claim.",
        "questions": [
            "What can a story mean even if it is not public evidence?",
            "When does a claim ask outsiders to believe more than the story itself shows?",
            "What label would be most honest if the claim is meaningful but not checkable?",
        ],
        "watch": "Students may treat testability as a ranking of human worth. Keep repeating: people are not on trial; public evidential uses of claims are.",
    },
    2: {
        "materials": "Claim Surgery worksheet, marker board, five vague promises, timer for gallery rotations.",
        "questions": [
            "What outcome would be different if this promise is true?",
            "Who is included, who is excluded, and why?",
            "Did our rewrite preserve the original claim's force or quietly weaken it?",
        ],
        "watch": "Students may make the promise so narrow that no result matters. Ask whether the revised claim still supports the rhetoric that brought it into the room.",
    },
    3: {
        "materials": "Evidence cards, bad-study cards, study-upgrade ladder, sample anecdote with missing denominator.",
        "questions": [
            "What does this evidence show at most?",
            "Where are the misses?",
            "What would be the first affordable improvement to this study?",
        ],
        "watch": "Students may hear criticism of evidence as criticism of sincerity. Use the phrase: sincere stories can be good leads and weak proof.",
    },
    4: {
        "materials": "Clean Miss worksheet, pre-commitment examples, three disappointing-result scenarios.",
        "questions": [
            "Could another person tell whether this result happened?",
            "Would this rule still apply if the result disappointed my side?",
            "What result is neutral because the test would be too messy to read?",
        ],
        "watch": "Students may write commitments that sound noble but cannot bite. Require observable terms and a concrete confidence change.",
    },
    5: {
        "materials": "Confounder cards, matched-comparison cards, public-health example, community-comparison example.",
        "questions": [
            "What ordinary factor could create the same pattern?",
            "What baseline risk differs before the promise is considered?",
            "What comparison group would both sides call fair before the data arrive?",
        ],
        "watch": "Students may use confounders as automatic debunkers. Confounders are not conclusions; they are controls the study must respect.",
    },
    6: {
        "materials": "Escape-hatch taxonomy, court-role cards, disappointing-result scripts, rewrite prompts.",
        "questions": [
            "Does this explanation leave any possible miss?",
            "Is this a devotional interpretation or a public evidence claim?",
            "How could we rewrite the claim so the explanation becomes honest rather than protective?",
        ],
        "watch": "Students may accuse each other of bad faith. Keep the focus on the function of the explanation, not the character of the defender.",
    },
    7: {
        "materials": "Study Design worksheet, protocol checklist, red-team forms, sample datasets list.",
        "questions": [
            "What is the smallest fair pilot that could disappoint this claim?",
            "Which design weakness would a critic reasonably press first?",
            "What would replication add that the first study cannot provide?",
        ],
        "watch": "Students may demand impossible perfection or settle for useless simplicity. Keep them between those errors: feasible but still risky.",
    },
    8: {
        "materials": "Student devices, projected tool, completed protocols, Tool Report Reflection worksheet.",
        "questions": [
            "Which setting moved the promise most and why?",
            "Does the score reflect study quality, willingness, clean-miss posture, or excuse drag?",
            "What does the tool not tell us?",
        ],
        "watch": "Students may treat the score as a truth probability. Correct this immediately: it measures exposure to public accountability.",
    },
    9: {
        "materials": "All-promises report, promise field map, colored dots or printed maps, stance labels.",
        "questions": [
            "Which promises are allowed to face evidence and which stay protected?",
            "Is openness consistent or selective?",
            "Does this stance fit a claim that a personal God is active in earthly life?",
        ],
        "watch": "Students may overgeneralize from one protected promise to all theology. Keep the scope narrow: earthly promise claims used as evidence.",
    },
    10: {
        "materials": "Capstone checklist, peer-question cards, timer, final reflection prompt.",
        "questions": [
            "What is this specific promise allowed to risk?",
            "What is the strongest fair criticism of the audit?",
            "What label is most honest after the test design is visible?",
        ],
        "watch": "Students may perform certainty for the group. Reward revision, calibrated language, and brave downgrading.",
    },
}


def session_page(story, session):
    enrichment = SESSION_ENRICHMENTS[session["number"]]
    new_page(story, f"Session {session['number']}: {session['title']}")
    story.append(callout("Driving question", session["question"], RUST, CREAM))
    story.append(Spacer(1, 6))
    story.append(
        compact_cards(
            [
                ("Outcomes", " / ".join(session["outcomes"]), BLUE_SOFT),
                ("Materials", enrichment["materials"], GREEN_SOFT),
                ("Watch for", enrichment["watch"], GOLD_SOFT),
                ("Artifact", session["artifact"], SOFT),
            ]
        )
    )
    story.append(subheading("90-minute teaching arc"))
    story.append(
        table(
            [["Time", "Move", "What happens"]]
            + [[time, move, detail] for time, move, detail in session["flow"]],
            [0.65 * inch, 1.35 * inch, 4.5 * inch],
        )
    )
    story.append(Spacer(1, 6))
    story.append(callout("Teacher move", session["teacher"], BLUE_MID, SOFT))
    story.append(Spacer(1, 6))
    story.append(
        table(
            [
                ["Discussion prompts", para_lines(enrichment["questions"], "TableBodyLarge")],
                ["Homework", session["homework"]],
            ],
            [1.35 * inch, 5.15 * inch],
            header=False,
            tint=CREAM,
            large=True,
        )
    )


def build_story():
    story = []

    story.append(Spacer(1, 0.55 * inch))
    story.append(
        Table(
            [[PE("CROSSHAIRS AUDIT LAB", "CoverKicker"), HaloMark(54)]],
            colWidths=[5.75 * inch, 0.75 * inch],
        )
    )
    story.append(Spacer(1, 0.85 * inch))
    story.append(P("Testing Earthly Promises<br/>A Full Curriculum", "CoverTitle"))
    story.append(
        PE(
            "A rigorous small-group course for young, honest seekers learning how to evaluate claims about prayer, healing, protection, prophecy, wisdom, moral transformation, morbidity, longevity, and providential help.",
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
    story.append(Spacer(1, 0.24 * inch))
    story.append(CurriculumMap())
    story.append(Spacer(1, 0.24 * inch))
    story.append(
        PE(
            "This curriculum teaches the contents of the Earthly Promise Test Field without making inquiry cynical. Students learn to preserve sincerity while refusing to let claims function as public evidence if no public result can count against them."
        )
    )

    new_page(story, "Curriculum at a Glance")
    story.append(
        PE(
            "Audience: a small group of young sincere seekers, roughly high school through early college, with mixed belief backgrounds. Recommended size: 6-12 students. Recommended rhythm: ten sessions of 75-100 minutes, plus optional office hours or mentor conferences."
        )
    )
    story.append(
        table(
            [
                ["Component", "Design choice"],
                ["Course aim", "Train intellectual honesty around earthly God-claims without sneering at hope, testimony, or devotional meaning."],
                ["Core habit", "Ask what the claim is allowed to risk before evaluating stories, studies, or explanations."],
                ["Main tool", "Earthly Promise Test Field, including active promise, study choice, mind-change commitment, escape hatches, result, map, report, JSON, and AI Review."],
                ["Final product", "A complete audit packet for one earthly promise plus a short oral defense."],
                ["Assessment stance", "Grade clarity, fairness, and rigor, not the student's final belief conclusion."],
            ],
            [1.35 * inch, 5.15 * inch],
            large=True,
        )
    )
    story.append(Spacer(1, 8))
    story.append(cards([
        ("Not a gotcha", "The teacher must protect inquiry from contempt. Honest testing is a form of respect for claims that purport to describe reality.", BLUE_SOFT),
        ("Not apologetics theater", "The course does not assume the answer. It asks whether a public promise is allowed to be corrected by public feedback.", GREEN_SOFT),
        ("Not scientism", "Only claims that already say something observable happens in earthly life are placed on the field.", GOLD_SOFT),
    ]))
    story.append(Spacer(1, 8))
    story.append(callout("Course mantra", "Meaning is not the same as public evidence. A claim can matter deeply while still needing a fair test before it is used as proof.", BLUE_MID, BLUE_SOFT))

    new_page(story, "Learning Objectives and Standards")
    story.append(PE("By the end of the course, students should be able to do the following without needing the teacher to rescue the conversation."))
    story.append(
        table(
            [
                ["Domain", "Students can..."],
                ["Claim clarity", "Translate vague spiritual language into promise, population, outcome, timeframe, and comparison group."],
                ["Falsifiability", "Explain what it means for an earthly promise to risk disappointment by a fair result."],
                ["Evidence literacy", "Rank anecdotes, pilots, observational studies, preregistered controls, blinded review, and replication by evidential strength."],
                ["Confounders", "Identify ordinary causes that could mimic the promised effect and propose controls."],
                ["Pre-commitment", "State what would count for, against, and as neutral before results are known."],
                ["Escape hatches", "Recognize explanations that make every result compatible with the claim."],
                ["Tool use", "Use the field score, promise map, report, JSON, and AI prompt responsibly."],
                ["Humility", "Distinguish a devotional interpretation from a public evidence claim without humiliating the person making it."],
            ],
            [1.35 * inch, 5.15 * inch],
            large=True,
        )
    )
    story.append(Spacer(1, 8))
    story.append(callout("Essential final question", "Am I willing for my confidence to be shaped by the world my claim says God is acting in?", RUST, CREAM))

    new_page(story, "Teacher Preparation")
    story.append(PE("The teacher is expected to be dynamic and creative, but the course still needs guardrails. The best teacher posture is warm, precise, and brave."))
    story.append(
        table(
            [
                ["Before the course", "Concrete preparation"],
                ["Read the manual", "Know the Earthly Promise Test Field manual, especially score meaning, clean miss, escape hatches, confounders, and AI Review."],
                ["Prepare claim cards", "Create cards with real or realistic claims: prayer works, God heals, God protects, believers are wiser, prophecy happens, faith improves behavior."],
                ["Prepare evidence cards", "Create cards for anecdote, case series, pilot, matched cohort, preregistered controlled study, blinded review, and replicated large-sample study."],
                ["Choose norms", "No ridicule. No moving goalposts. No forced disclosure. Claims can be tested without treating people as targets."],
                ["Technology", "Have the tool available on a projector and student devices. Keep printed worksheets for students who think better on paper."],
            ],
            [1.45 * inch, 5.05 * inch],
            large=True,
        )
    )
    story.append(Spacer(1, 8))
    story.append(subheading("Facilitation moves"))
    story.append(
        bullet_list(
            [
                "Ask, \"What would make this fair to both sides?\" when students polarize.",
                "Ask, \"Compared to what?\" when a claim floats without a baseline.",
                "Ask, \"Would this still count if the result went the other way?\" when students protect a favorite claim.",
                "Ask, \"Are we lowering the rhetoric or improving the test?\" when a claim becomes smaller after scrutiny.",
                "Ask, \"What would a sincere defender and a sincere skeptic both accept as a clean miss?\" before data are discussed.",
            ],
            "Body",
        )
    )
    story.append(callout("Teacher warning", "Do not let the course become a debate about every theological doctrine. The curriculum is about earthly promises that are offered as public evidence.", RUST, CREAM))

    new_page(story, "Course Covenant and Room Norms")
    story.append(PE("This course asks students to examine cherished claims without humiliating the people who cherish them. Begin by making the social contract explicit."))
    story.append(
        table(
            [
                ["Norm", "Teacher language"],
                ["No ridicule", "We can inspect a claim sharply without making a person feel like the target."],
                ["No forced disclosure", "Students may analyze public or hypothetical claims instead of personal family or church stories."],
                ["No moving goalposts", "Once a clean-miss rule is written, it should not be quietly rewritten after a disappointing result."],
                ["No cheap victory", "A skeptic must improve weak studies, not merely sneer at them. A defender must name misses, not merely remember hits."],
                ["Distinguish labels", "Private meaning, devotional interpretation, public evidence, and strong public evidence are different labels."],
                ["Revision is honorable", "Changing a claim label from proof to personal interpretation can be intellectual progress."],
            ],
            [1.4 * inch, 5.1 * inch],
            large=True,
        )
    )
    story.append(Spacer(1, 8))
    story.append(cards([
        ("Warmth", "Protect students from contempt, shame, and identity threat.", BLUE_SOFT),
        ("Precision", "Require clear claims, fair comparisons, and visible rules.", GREEN_SOFT),
        ("Courage", "Let strong claims face outcomes that could disappoint them.", GOLD_SOFT),
    ]))
    story.append(Spacer(1, 8))
    story.append(callout("Opening script", "This course will not ask you to mock faith or fake neutrality. It will ask you to stop using a claim as public evidence if no public result is allowed to count against it.", RUST, CREAM))

    new_page(story, "Vocabulary and Misconception Map")
    story.append(PE("Students need shared language before the debates become emotionally loaded. Return to these terms whenever the group gets blurry."))
    story.append(
        table(
            [
                ["Term", "Plain meaning", "Common misconception to correct"],
                ["Earthly promise", "A claim that God does something observable in ordinary life.", "Not every theological claim belongs on the field."],
                ["Public evidence", "A reason offered to people outside the experience as support for the claim.", "A story can matter without being strong public evidence."],
                ["Falsifiability", "A fair result could count against the claim as stated.", "Falsifiable does not mean false, crude, or hostile."],
                ["Clean miss", "A negative result under rules agreed before the outcome.", "A miss is not the same as a messy or broken study."],
                ["Confounder", "An ordinary factor that could produce the same pattern.", "Naming a confounder is not automatically debunking the claim."],
                ["Escape hatch", "A response that prevents a poor result from counting.", "An escape hatch may be sincere and still reduce public evidential force."],
                ["Study rigor", "How well a test counts misses, controls bias, uses comparison, and resists hindsight repair.", "Rigor is not elitism; it is protection against fooling ourselves."],
            ],
            [1.0 * inch, 2.65 * inch, 2.85 * inch],
        )
    )
    story.append(Spacer(1, 8))
    story.append(callout("Vocabulary checkpoint", "Before students argue about whether a promise is true, ask them which label they are using: personal meaning, devotional interpretation, public evidence, or strong public evidence.", BLUE_MID, BLUE_SOFT))

    new_page(story, "Pacing, Adaptation, and Evidence Ethics")
    story.append(PE("The curriculum is designed for ten 90-minute sessions, but real groups vary. Use these adaptations without losing the course's spine."))
    story.append(
        table(
            [
                ["Need", "Adaptation"],
                ["75-minute sessions", "Shorten the warm-up and exit ticket; keep the claim, study, commitment, excuse, and result moves intact."],
                ["100-minute sessions", "Add a red-team round, student-designed examples, or a second promise comparison."],
                ["Younger students", "Use more card sorts, role-play, and concrete examples. Reduce formula language but keep clean-miss rules."],
                ["Advanced students", "Add preregistration templates, basic causal diagrams, base-rate work, and prediction-market comparisons."],
                ["Mixed belief group", "Let students choose public examples. Do not require personal testimony as raw material."],
                ["Sensitive claims", "Use anonymized or fictionalized examples for illness, death, abuse, and family conflict."],
            ],
            [1.45 * inch, 5.05 * inch],
            large=True,
        )
    )
    story.append(Spacer(1, 8))
    story.append(callout("Ethical floor", "Students are learning how to test claims, not how to interrogate vulnerable people. Do not turn grief, illness, or family conflict into classroom spectacle.", RUST, CREAM))

    new_page(story, "Course Architecture")
    story.append(PE("Every session repeats the same five-part arc. Repetition is intentional: students should internalize the moves until they become habits of fair inquiry."))
    story.append(CurriculumMap())
    story.append(Spacer(1, 8))
    story.append(
        table(
            [
                ["Session", "Core content", "Main student artifact"],
                ["1", "Meaning versus evidence; scope of the tool.", "Claim-sorting sheet."],
                ["2", "Turning vague promise language into testable claims.", "Clean promise statement."],
                ["3", "Evidence gradient; bad study / better study.", "Study upgrade comparison."],
                ["4", "Clean miss and mind-change pre-commitment.", "Counts-for / against / neutral rules."],
                ["5", "Confounders and matched comparisons.", "Confounder checklist."],
                ["6", "Escape hatches and protected rhetoric.", "Escape-hatch analysis."],
                ["7", "Study design studio.", "One-page study protocol."],
                ["8", "Tool lab and promise field map.", "Tool report and interpretation."],
                ["9", "Suite-wide stance and personal-active-God question.", "All-promises stance analysis."],
                ["10", "Capstone audit and public reflection.", "Final audit packet."],
            ],
            [0.65 * inch, 3.15 * inch, 2.7 * inch],
            large=True,
        )
    )
    story.append(Spacer(1, 8))
    story.append(callout("Pedagogical spine", "What exactly is being claimed? What earthly outcome should differ? Compared to what? What would count against it? What explanation would prevent any result from mattering?", BLUE_MID, BLUE_SOFT))

    for session in SESSIONS:
        session_page(story, session)

    new_page(story, "Signature Activity Protocols")
    story.append(PE("These reusable activities make the curriculum feel alive. A creative teacher can remix them while preserving the intellectual discipline."))
    story.append(
        table(
            [
                ["Activity", "How to run it", "What it trains"],
                ["Claim Surgery", "Give students vague claims. They must preserve the claim's intended force while adding outcome, population, timeframe, and comparison.", "Precision without straw-manning."],
                ["Anecdote Autopsy", "Students inspect a moving story and identify missing denominator, misses, comparison group, timing rule, and ordinary causes.", "Respectful evidence literacy."],
                ["Study Upgrade Ladder", "Teams improve a claim from anecdote to pilot to matched study to preregistered replicated study.", "Understanding why rigor moves the field."],
                ["Confounder Relay", "Teams race to identify ordinary causes and controls for each promise type.", "Baseline thinking and comparison design."],
                ["Escape Hatch Court", "One team defends a disappointing result; the other asks whether any possible result could count against the claim.", "Functional falsifiability."],
                ["Promise Field Prediction", "Before using the app, students predict the score and explain which setting will matter most.", "Metacognition and tool literacy."],
                ["AI Review Cross-Check", "Students compare their own audit to an AI critique and revise only where the critique is fair.", "Second-order analysis without outsourcing judgment."],
            ],
            [1.35 * inch, 3.25 * inch, 1.9 * inch],
        )
    )
    story.append(Spacer(1, 8))
    story.append(callout("Best activity norm", "Every activity should end with a better version of the claim, the study, or the student's own honesty. Do not end with mere demolition.", RUST, CREAM))

    new_page(story, "Promise Content Matrix")
    story.append(PE("Use this matrix as the teacher's quick reference when students choose different promises for their projects."))
    story.append(
        table(
            [
                ["Promise", "Possible metric", "Better comparison", "Confounders"],
                ["Answered prayer", "Recovery, request fulfillment, objective outcome change.", "Timestamped prayer requests versus matched non-prayer controls.", "Natural recovery, support, severity, selective memory."],
                ["Divine healing", "Verified medical improvement beyond treatment expectations.", "Medical records reviewed by independent clinicians.", "Treatment, misdiagnosis, spontaneous remission, missing scans."],
                ["Future knowledge", "Accuracy of public timestamped predictions.", "Fixed scoring against ordinary forecasting baselines.", "Vagueness, hindsight, multiple guesses, private timestamps."],
                ["Wisdom", "Decision quality or forecast accuracy.", "Advice logs versus expert, public baseline, or Polymarket-style prediction markets.", "Education, resources, coaching, hindsight, risk tolerance."],
                ["Better behavior", "Crime, divorce, obesity, abuse response, restitution, volunteering.", "Christian communities versus matched secular communities, including Japanese or other secular baselines when well matched.", "Age, income, education, culture, reporting rates, policing."],
                ["Protection", "Accidents, injury, violence, hospitalization, death.", "Matched exposure-risk cohorts.", "Occupation, travel, safety training, infrastructure."],
                ["Reduced morbidity", "COVID infection, hospitalization, death, long-COVID.", "Matched public-health cohorts.", "Vaccination, age, exposure, testing, care access."],
                ["Longevity", "Verified age and survival curves.", "Substantial believer or prayer groups versus demographic controls.", "Wealth, genetics, lifestyle, records, age exaggeration."],
                ["Providential help", "Need fulfillment within predeclared windows.", "Comparable needs tracked with full miss-counting.", "Social networks, prior resources, flexible timing."],
            ],
            [1.05 * inch, 1.75 * inch, 2.0 * inch, 1.7 * inch],
        )
    )

    new_page(story, "Pre-Course and Post-Course Diagnostics")
    story.append(PE("Use the same short diagnostic at the beginning and end. The goal is to see whether students became clearer, fairer, and more willing to let claims risk disappointment."))
    story.append(
        table(
            [
                ["Prompt", "What to look for"],
                ["Define public evidence in your own words.", "Student separates personal meaning from reasons offered to outsiders."],
                ["Rewrite: \"God protects believers\" as a testable claim.", "Student names outcome, population, timeframe, and comparison."],
                ["What would count as a clean miss for a prayer claim?", "Student gives a fair negative result rather than a vague mood."],
                ["Name two confounders in a healing claim.", "Student names ordinary causes and does not treat them as automatic disproof."],
                ["Why are anecdotes weaker than matched studies?", "Student mentions misses, denominators, controls, and comparison groups."],
                ["When does an explanation become an escape hatch?", "Student focuses on whether poor results can still count."],
            ],
            [2.35 * inch, 4.15 * inch],
            large=True,
        )
    )
    story.append(Spacer(1, 8))
    story.append(callout("Growth indicator", "The best sign of learning is not that students become more skeptical. It is that they become more precise about which claims are meaningful, which are public evidence, and which are protected from public checks.", BLUE_MID, BLUE_SOFT))

    new_page(story, "Assessment System")
    story.append(PE("Assess the quality of inquiry, not whether students end as believers, skeptics, or undecided. The course should reward intellectual courage and clarity."))
    story.append(
        table(
            [
                ["Criterion", "Excellent", "Developing", "Needs revision"],
                ["Claim clarity", "Specific promise, outcome, population, timeframe, and comparison.", "Some specificity but important terms remain elastic.", "Claim remains vague or shifts during critique."],
                ["Evidence rigor", "Study design includes fair controls, data source, miss-counting, and replication path.", "Study is plausible but leaves major bias or confounders open.", "Relies mostly on anecdotes or cherry-picked cases."],
                ["Clean miss", "A negative result is named before results and would actually lower confidence.", "A miss is named but can be softened easily.", "No result clearly counts against the claim."],
                ["Confounders", "Ordinary causes are anticipated and controlled thoughtfully.", "Some causes named but controls are thin.", "Ordinary causes are dismissed or ignored."],
                ["Escape hatches", "Protective replies are identified and their effect on testability is explained.", "Some escape hatches noticed but not evaluated functionally.", "Every outcome is allowed to confirm the claim."],
                ["Humility", "Distinguishes private meaning from public evidence.", "Sometimes blurs meaning and evidence.", "Treats sincerity or emotional force as enough for public proof."],
            ],
            [1.05 * inch, 1.85 * inch, 1.8 * inch, 1.8 * inch],
        )
    )
    story.append(Spacer(1, 8))
    story.append(callout("Rubric principle", "A student can receive top marks while personally disagreeing with the teacher. The work is excellent if the inquiry is clear, fair, risky, and humble.", BLUE_MID, BLUE_SOFT))

    new_page(story, "Capstone Requirements")
    story.append(PE("The capstone gathers the entire course into one disciplined audit. Each student chooses one promise and prepares a packet plus a two-minute oral defense."))
    story.append(
        table(
            [
                ["Required item", "What it must include"],
                ["1. Claim statement", "Promise, outcome, population, timeframe, and comparison group."],
                ["2. Evidence gradient", "Current evidence level plus one bad-study / better-study comparison."],
                ["3. Study protocol", "Outcome, sample, data source, comparison, review method, miss rule, and replication path."],
                ["4. Confounder checklist", "At least five ordinary causes and how each would be controlled."],
                ["5. Clean-miss commitment", "Counts for, counts against, and neutral results written before final interpretation."],
                ["6. Escape-hatch analysis", "Likely protective replies and how they affect public evidential force."],
                ["7. Tool result", "Score, field position, selected settings, promise map observation, and report or screenshot."],
                ["8. AI Review", "Prompt used, one useful critique, one questionable critique, and one revision made."],
                ["9. Reflection", "Answer the closing question about confidence being shaped by the world the claim invokes."],
            ],
            [1.55 * inch, 4.95 * inch],
            large=True,
        )
    )
    story.append(Spacer(1, 8))
    story.append(callout("Oral defense format", "Two minutes: claim, fair test, clean miss, strongest confounder, final label. Then peers ask one clarification, one rigor question, and one humility question.", RUST, CREAM))

    new_page(story, "Student Worksheet: Claim Surgery")
    worksheet_rows = [
        ["Original claim", ""],
        ["Promise category", ""],
        ["Who or what is affected?", ""],
        ["Observable outcome", ""],
        ["Timeframe", ""],
        ["Comparison group", ""],
        ["Cleaner claim in one sentence", ""],
        ["What changed from the original wording?", ""],
    ]
    story.append(PE("Use this before any study design. A claim that cannot be stated clearly cannot be tested fairly."))
    story.append(blank_table(worksheet_rows, 0.46 * inch))

    new_page(story, "Student Worksheet: Clean Miss")
    story.append(PE("Complete this before selecting escape hatches or interpreting results. The goal is not self-punishment; the goal is honest rules before incentives appear."))
    story.append(blank_table([
        ["Promise being tested", ""],
        ["Result that counts for the claim", ""],
        ["Result that counts against the claim", ""],
        ["Result that counts as neutral or too messy", ""],
        ["What would lower my confidence?", ""],
        ["What would not lower my confidence, and why?", ""],
        ["How another person could tell whether the result happened", ""],
    ], 0.58 * inch))

    new_page(story, "Student Worksheet: Study Design")
    story.append(PE("A good pilot can be simple, but it must still be able to disappoint the claim."))
    story.append(blank_table([
        ["Study title", ""],
        ["Outcome measure", ""],
        ["Participants or cases", ""],
        ["Comparison group", ""],
        ["Data source", ""],
        ["Blinding or independent review", ""],
        ["Preregistration or timestamping plan", ""],
        ["Sample size and replication path", ""],
        ["Clean miss rule", ""],
        ["Biggest weakness remaining", ""],
    ], 0.42 * inch))

    new_page(story, "Student Worksheet: Confounders and Escape Hatches")
    story.append(PE("This page keeps ordinary causes and protective explanations visible."))
    story.append(worksheet_table(
        ["Ordinary confounder", "Why it could mimic the effect", "How to control it"],
        5,
        [1.8 * inch, 2.35 * inch, 2.35 * inch],
        0.44 * inch,
    ))
    story.append(Spacer(1, 10))
    story.append(worksheet_table(
        ["Escape hatch I might use", "Would any result still count against the claim?", "More honest rewrite"],
        4,
        [1.85 * inch, 2.25 * inch, 2.4 * inch],
        0.44 * inch,
    ))

    new_page(story, "Student Worksheet: Tool Report Reflection")
    story.append(PE("Use after entering your claim into the Earthly Promise Test Field."))
    story.append(blank_table([
        ["Active promise and selected study", ""],
        ["Score and diagnosis", ""],
        ["Run willingness and clean-failure willingness", ""],
        ["Escape hatches selected", ""],
        ["What moved the point right?", ""],
        ["What pulled the point left?", ""],
        ["What the result says", ""],
        ["What the result does not say", ""],
        ["One revision I should make", ""],
    ], 0.45 * inch))

    new_page(story, "Teacher Troubleshooting Guide")
    story.append(PE("Use these responses when the room gets stuck. They keep the inquiry rigorous without flattening the human stakes."))
    story.append(
        table(
            [
                ["Student move", "Teacher response"],
                ["This feels like testing God.", "We are testing whether a human claim about earthly effects is being used as public evidence. If it is not public evidence, label it that way."],
                ["But anecdotes matter.", "Yes. They can suggest where to look. Now ask what would happen if we counted misses and comparison cases too."],
                ["God can say no.", "That may be a devotional interpretation. But if yes, no, delay, and silence all confirm equally, the public effect is no longer testable."],
                ["Science cannot measure everything.", "Correct. This tool only applies ordinary checks to claims that already say something observable happens in ordinary life."],
                ["No study is perfect.", "Right. The question is whether the claim is allowed to move toward better checks or retreats as checks improve."],
                ["This is making people uncomfortable.", "Good inquiry can be uncomfortable. We will protect people from ridicule, not claims from fair questions."],
            ],
            [1.8 * inch, 4.7 * inch],
            large=True,
        )
    )
    story.append(Spacer(1, 8))
    story.append(callout("Final teacher posture", "The most powerful teaching moments come when students realize they do not need to fake certainty. They can downgrade a claim, improve a study, keep private meaning, or revise belief with dignity.", BLUE_MID, BLUE_SOFT))

    new_page(story, "Closing Reflection")
    story.append(PE("The curriculum should end slowly. Let students see that intellectual honesty is not a cold personality trait; it is a discipline of courage, fairness, and self-respect."))
    story.append(cards([
        ("For believers", "The course can protect faith from overclaiming and from confusing testimony with public proof.", BLUE_SOFT),
        ("For skeptics", "The course can protect skepticism from laziness by requiring fair comparisons and better tests.", GREEN_SOFT),
        ("For the undecided", "The course gives a way to stay open without becoming vague or easily manipulated.", GOLD_SOFT),
    ]))
    story.append(Spacer(1, 14))
    story.append(callout("Last question", "Am I willing for my confidence to be shaped by the world my claim says God is acting in?", RUST, CREAM))
    story.append(Spacer(1, 10))
    story.append(PE("A student who can answer that question honestly has learned the core of the Earthly Promise Test Field."))

    return story


def blank_table(rows, row_height):
    t = Table(
        [[PE(label, "TableBodyLarge"), PE("", "TableBodyLarge")] for label, _ in rows],
        colWidths=[2.05 * inch, 4.45 * inch],
        rowHeights=[row_height] * len(rows),
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
    return t


def build_pdf():
    doc = SimpleDocTemplate(
        str(OUTPUT_PDF),
        pagesize=letter,
        leftMargin=0.72 * inch,
        rightMargin=0.72 * inch,
        topMargin=0.72 * inch,
        bottomMargin=0.62 * inch,
        title="Testing Earthly Promises: A Full Curriculum",
        author="Crosshairs Audit Lab",
        subject="Curriculum for teaching the Earthly Promise Test Field",
    )
    doc.build(build_story(), onFirstPage=on_first_page, onLaterPages=on_later_pages)
    print(OUTPUT_PDF)


if __name__ == "__main__":
    build_pdf()

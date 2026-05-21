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
OUTPUT_PDF = OUTPUT_DIR / "promising-gods-mirror-curriculum.pdf"

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


class MirrorMap(Flowable):
    def __init__(self):
        super().__init__()
        self.width = 6.5 * inch
        self.height = 1.25 * inch

    def draw(self):
        c = self.canv
        w = self.width
        h = self.height
        colors_by_step = [BLUE_MID, GREEN, RUST, GOLD_DARK, BLUE]
        labels = ["DISTANCE", "CASE", "LADDER", "REVEAL", "TRANSFER"]
        for i, label in enumerate(labels):
            x = i * (w / 5)
            c.setFillColor(colors_by_step[i])
            c.roundRect(x + 3, h * 0.34, w / 5 - 6, h * 0.42, 9, fill=1, stroke=0)
            c.setFillColor(WHITE)
            c.setFont("Helvetica-Bold", 8.2)
            c.drawCentredString(x + w / 10, h * 0.5, label)
            if i < 4:
                c.setStrokeColor(LINE)
                c.setLineWidth(1.2)
                c.line(x + w / 5 - 2, h * 0.55, x + w / 5 + 7, h * 0.55)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 7.2)
        c.drawCentredString(w / 2, 9, "The course keeps moving from unfamiliar cases toward stable transfer into familiar Christian claims.")


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
    canvas.drawString(doc.leftMargin, PAGE_HEIGHT - 27, "Promising Gods Mirror Curriculum")
    canvas.setFillColor(RUST_DARK)
    canvas.drawRightString(PAGE_WIDTH - doc.rightMargin, PAGE_HEIGHT - 27, "Crosshairs Audit Lab")
    canvas.setStrokeColor(LINE)
    canvas.line(doc.leftMargin, 43, PAGE_WIDTH - doc.rightMargin, 43)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(doc.leftMargin, 28, "A teacher-ready curriculum for asymmetry, collapse lines, and transfer into familiar promise claims.")
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
    for title_text, body, tint in items:
        cells.append([PE(title_text, "CardTitle"), PE(body, "BodySmall")])
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
    for title_text, body, tint in items:
        cells.append([PE(title_text, "CardTitle"), PE(body, "Tiny")])
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


def new_page(story, title_text):
    story.append(PageBreak())
    story.append(heading(title_text))


SESSIONS = [
    {
        "number": 1,
        "title": "Meaning, Evidence, and Public Promise Language",
        "question": "When is a sacred sentence being used as public evidence rather than devotional meaning?",
        "outcomes": [
            "Distinguish public promise language from inward meaning or symbolic reassurance.",
            "Explain why the mirror tests rhetoric about observable earthly effects rather than God as such.",
            "Name the emotional risks of asking a cherished claim to face public disappointment.",
        ],
        "flow": [
            ("0-10", "Opening norm", "Students write one sentence beginning: I want to be honest enough to..."),
            ("10-25", "Claim sort", "Sort sample statements into private meaning, mixed language, and public earthly promise."),
            ("25-45", "Mini-lesson", "Teach public promise, matched result, collapse line, and asymmetry."),
            ("45-65", "Rewrite lab", "Students clean up five fuzzy statements so the class can tell what kind of claim each really is."),
            ("65-82", "Debrief", "Ask which claims felt threatening to classify and why."),
            ("82-90", "Exit ticket", "One statement I can value without using as public evidence is..."),
        ],
        "teacher": "Hold the distinction calmly. Students may hear public scrutiny as an attack on meaning. Keep separating value, truth, and evidential use.",
        "artifact": "Claim-sorting sheet with one self-chosen example.",
        "homework": "Bring three real examples of Christian promise language from sermons, songs, social media, or conversation.",
    },
    {
        "number": 2,
        "title": "Why Invented Gods Help",
        "question": "What becomes easier to see when the scripture is unfamiliar?",
        "outcomes": [
            "Explain the tool's use of fictive gods as a distance-making device.",
            "Recognize the reflex to rescue familiar verses more quickly than unfamiliar ones.",
            "Describe the asymmetry the mirror is designed to expose.",
        ],
        "flow": [
            ("0-12", "Warm-up", "Students compare reactions to a fake promise and a familiar promise with similar wording."),
            ("12-30", "Distance lesson", "Map why invented scriptures lower reflexive rescue."),
            ("30-52", "Asymmetry drill", "Teams predict where other students will loosen standards once the text sounds biblical."),
            ("52-70", "Good-faith discussion", "Discuss why familiarity, reverence, and memory can be both understandable and distorting."),
            ("70-84", "Reflection write", "Students describe one promise they suspect they protect because it feels sacred."),
            ("84-90", "Exit ticket", "The phrase that changes most when the scripture becomes familiar is..."),
        ],
        "teacher": "Do not let the room treat believers as gullible. The lesson is that all humans defend what feels holy, familiar, or identity-bearing.",
        "artifact": "Short reflection on familiarity and selective rescue.",
        "homework": "Write a paragraph explaining why invented cases can sometimes produce fairer first judgments.",
    },
    {
        "number": 3,
        "title": "Reading a Mirror Case",
        "question": "What information does one case actually give you before you set a line?",
        "outcomes": [
            "Parse verse, public claim, ordinary test, observed result, and required retreat.",
            "Translate domain language into an observable earthly difference.",
            "Explain why the tool fixes the flat result before asking for judgment.",
        ],
        "flow": [
            ("0-10", "Orientation", "Teacher walks the class through one complete case without choosing a rung yet."),
            ("10-30", "Case anatomy", "Students label which sentence does which job: verse, claim, test, result, retreat."),
            ("30-50", "Domain mapping", "Pairs rewrite provision, healing, prophecy, behavior, and longevity into public-outcome language."),
            ("50-68", "Comparison work", "Ask what matched comparison is doing in each case."),
            ("68-83", "Pressure check", "Students explain what the case already gives them and what it deliberately withholds."),
            ("83-90", "Exit ticket", "The most important sentence in a case is... because..."),
        ],
        "teacher": "Keep students from jumping too fast to Bible verses. This session is about learning the anatomy of one mirror case first.",
        "artifact": "Labeled case worksheet.",
        "homework": "Choose one case and rewrite its public claim in one sentence without losing its force.",
    },
    {
        "number": 4,
        "title": "Flat Outcomes and Matched Comparisons",
        "question": "Why does the mirror build around flat matched results instead of live evidence debate?",
        "outcomes": [
            "Explain the role of matched comparison groups and ordinary controls.",
            "Recognize why a flat result is the teaching pressure point of the mirror.",
            "Distinguish data disagreement from rhetorical retreat after the data are fixed.",
        ],
        "flow": [
            ("0-10", "Opening puzzle", "Two groups look different until controls are added. Students predict what happened."),
            ("10-28", "Mini-lesson", "Teach matching, controls, and why public claims need fair denominators."),
            ("28-52", "Case comparisons", "Students examine the different test descriptions across the nine cases."),
            ("52-70", "Why flat matters", "Discuss why the mirror removes the endless search for one more anecdote."),
            ("70-84", "Teacher challenge", "Ask what it would mean to keep calling the verse a public promise after this flat result."),
            ("84-90", "Exit ticket", "The flat result forces me to ask..."),
        ],
        "teacher": "Students may want to argue about whether a better study could exist. Remind them that the mirror is isolating the post-result interpretive move.",
        "artifact": "Matched-comparison explanation sheet.",
        "homework": "Write two sentences explaining the difference between disputing a dataset and redefining a promise after the result is fixed.",
    },
    {
        "number": 5,
        "title": "The Collapse Ladder I: Public Result, Subgroup, Hindsight Rescue",
        "question": "What is already being surrendered in the first three rungs?",
        "outcomes": [
            "Explain rungs 1-3 in plain language.",
            "Identify subgroup shrinking and hindsight rescue as weakening moves.",
            "Defend an honest first stop line before comfort language even begins.",
        ],
        "flow": [
            ("0-12", "Opening review", "Students restate the first three rungs without reading them verbatim."),
            ("12-30", "Rung sort", "Teams match sample defenses to rung 1, rung 2, or rung 3."),
            ("30-55", "Debate drill", "One team defends the promise, one team names the rung that defense has already reached."),
            ("55-72", "Why this counts", "Teacher draws how subgroup rescue and hindsight rescue weaken a promise even if devotion remains sincere."),
            ("72-84", "Private line", "Students write where they are tempted to stop too late and why."),
            ("84-90", "Exit ticket", "The difference between subgroup rescue and hindsight rescue is..."),
        ],
        "teacher": "Do not let rung 2 sound harmless. A promise that must shrink after the outcome is already weaker than it first appeared.",
        "artifact": "Rungs 1-3 comparison sheet.",
        "homework": "Find one Christian statement that already seems to rely on subgroup rescue or hindsight rescue.",
    },
    {
        "number": 6,
        "title": "The Collapse Ladder II: Comfort and Never-Public Retreat",
        "question": "What changes when a promise survives only as comfort or only by denying it was public?",
        "outcomes": [
            "Distinguish comfort-only survival from full denial that a public promise existed.",
            "Explain why comfort may still be valuable without still counting as public evidence.",
            "Recognize rung 5 as a rhetorical retreat, not a public success.",
        ],
        "flow": [
            ("0-12", "Opening distinction", "Students contrast: this still comforts me versus this was never promising a public effect."),
            ("12-30", "Rungs 4 and 5 lesson", "Teacher names what is preserved and what is surrendered at each rung."),
            ("30-50", "Language repair", "Teams rewrite overclaimed verses into honest comfort-language without pretending they are still public promises."),
            ("50-70", "Case practice", "Pairs set rung 4 or rung 5 on several sample defenses and justify the difference."),
            ("70-84", "Whole-room debrief", "Ask why rung 5 should not be verbally confused with fulfilled promise-language."),
            ("84-90", "Exit ticket", "A promise can still matter after rung 4 because... but it can no longer be used as public evidence because..."),
        ],
        "teacher": "Students may hear this session as dismissing comfort. Keep repeating: the tool is narrowing categories, not insulting consolation.",
        "artifact": "Comfort versus public-promise distinction paragraph.",
        "homework": "Write one short paragraph that preserves pastoral warmth while honestly downgrading a public promise into comfort-language.",
    },
    {
        "number": 7,
        "title": "Running the Mirror Tool",
        "question": "What happens when you actually set stop lines across multiple cases?",
        "outcomes": [
            "Navigate the tool confidently and set stop lines case by case.",
            "Read the live verdicts and summary totals responsibly.",
            "Compare patterns across gods, domains, and personal thresholds.",
        ],
        "flow": [
            ("0-10", "Orientation", "Teacher reviews current case, stop line labels, verdict box, summary ledger, and report."),
            ("10-28", "Prediction first", "Students predict which domains they expect to collapse earliest."),
            ("28-62", "Tool lab", "Students work through at least five cases individually or in pairs, logging their reasons."),
            ("62-76", "Pattern share", "Students compare where they stopped early, late, or inconsistently."),
            ("76-86", "Report check", "Teacher shows how the report preserves verdicts and biblical parallels together."),
            ("86-90", "Exit ticket", "The domain where I was most permissive was..."),
        ],
        "teacher": "Require reasons, not just clicks. The value of the tool is in naming why a promise is no longer functioning as a promise.",
        "artifact": "Partial mirror report with annotations.",
        "homework": "Finish all nine cases if you have not already, and bring one domain where your line surprised you.",
    },
    {
        "number": 8,
        "title": "Reveal, Bible Parallels, and Asymmetry",
        "question": "Do you keep the same collapse line once the verses become familiar?",
        "outcomes": [
            "Compare fictive judgments with biblical parallels without rushing to special pleading.",
            "State one stable rule that should govern both invented and biblical promise language.",
            "Recognize where familiarity is changing the standard.",
        ],
        "flow": [
            ("0-10", "Opening reminder", "Teacher states the rule: do not answer with context first; answer with your line first."),
            ("10-30", "Reveal walk-through", "Students inspect the unlocked parallels and note any immediate instinct to relax the standard."),
            ("30-55", "Asymmetry pairs", "Pairs choose two cases and explain whether they would keep the same line on the biblical parallel."),
            ("55-72", "Context discussion", "Only now does the class discuss context, devotional use, and ordinary Christian invocation."),
            ("72-84", "Stable-rule writing", "Students write one principle they believe should survive the shift from fictive to biblical language."),
            ("84-90", "Exit ticket", "The verse that most tempted me to change my standard was..."),
        ],
        "teacher": "The rule of this session is timing. Students may talk about context, but only after they have admitted whether their first line changed when the verse became familiar.",
        "artifact": "Asymmetry memo with two case comparisons.",
        "homework": "Write a 250-word reflection on whether your standard changed once the reveal appeared.",
    },
    {
        "number": 9,
        "title": "Transfer into Earthly Promise Test Field",
        "question": "How do you carry the same line into live Christian promise claims?",
        "outcomes": [
            "Explain the difference between the mirror's fixed flat results and the field's live study and excuse controls.",
            "Choose one real Christian promise domain to test next.",
            "Write a transfer plan that preserves the same standard under familiarity.",
        ],
        "flow": [
            ("0-12", "Companion map", "Teacher compares mirror workflow with Earthly Promise Test Field workflow."),
            ("12-32", "Domain selection", "Students choose one real Christian promise domain they want to test next."),
            ("32-55", "Transfer worksheet", "Students state their collapse line and what kind of live evidence the field should now be allowed to use."),
            ("55-72", "Excuse-preview discussion", "Class predicts which escape hatches they will be tempted to use in the companion field."),
            ("72-84", "Plan share", "Students present a short transfer plan to a partner for challenge and refinement."),
            ("84-90", "Exit ticket", "The promise domain I most need to test under the same standard is..."),
        ],
        "teacher": "This session prevents the mirror from becoming a self-contained clever exercise. The goal is transfer, not applause.",
        "artifact": "Earthly Promise transfer worksheet.",
        "homework": "Open the companion field and draft one real Christian claim you are willing to test next.",
    },
    {
        "number": 10,
        "title": "Capstone Audit and Public Reflection",
        "question": "What is your most honest description of the promise after the mirror and the transfer step?",
        "outcomes": [
            "Present a completed mirror report and one transfer plan into the companion field.",
            "Receive critique without moving the goalposts.",
            "Reflect on how stable standards should govern future apologetics or deconstruction conversations.",
        ],
        "flow": [
            ("0-10", "Set tone", "Teacher reminds students that revision is a success condition, not an embarrassment."),
            ("10-55", "Capstone presentations", "Students present one mirror case cluster, their overall ledger, and their transfer plan into the field."),
            ("55-72", "Peer challenge", "Classmates ask whether the same standard is being kept under familiarity."),
            ("72-84", "Reflection write", "Students answer the course's final question about public promise language and asymmetry."),
            ("84-90", "Exit ticket", "One claim I will now describe more carefully is..."),
        ],
        "teacher": "Reward calibrated revision, not rhetorical confidence. The strongest capstone is the one that keeps one standard across invented and familiar claims.",
        "artifact": "Final mirror report plus transfer memo.",
        "homework": "Optional: run the chosen Christian claim through Earthly Promise Test Field and append the result to your capstone packet.",
    },
]


SESSION_ENRICHMENTS = {
    1: {
        "materials": "Claim-sort cards, room norms poster, three sample promise statements, student notebooks.",
        "questions": [
            "What makes this statement public rather than merely personal?",
            "Could someone outside the experience reasonably ask for an earthly check?",
            "What are we protecting when we refuse to classify the claim clearly?",
        ],
        "watch": "Students may hear classification as disrespect. Repeat that clear labels protect both sincerity and honesty.",
    },
    2: {
        "materials": "Paired fake and familiar promise statements, asymmetry worksheet, whiteboard for rescue patterns.",
        "questions": [
            "What changed when the verse became familiar?",
            "Would I have said this was a promise if the holy book belonged to another religion?",
            "What kind of rescue now feels natural only because the text feels sacred?",
        ],
        "watch": "Students may treat themselves as uniquely objective. Encourage confession of asymmetry rather than performance of neutrality.",
    },
    3: {
        "materials": "Printed mirror cases, case-anatomy worksheet, domain labels, projector with tool open.",
        "questions": [
            "Which sentence names the effect, and which sentence names the evidence?",
            "What exactly is the public difference the verse appears to promise?",
            "Why does the tool include the flat result before asking for judgment?",
        ],
        "watch": "Students may skip past the case anatomy and jump to defending or attacking the verse too early.",
    },
    4: {
        "materials": "Matched-comparison examples, confounder cards, chart showing raw versus controlled outcomes.",
        "questions": [
            "Compared to what?",
            "What ordinary factor could mimic the promised effect?",
            "What is the mirror teaching by refusing to keep the data question permanently open?",
        ],
        "watch": "Students may use uncertainty as an all-purpose shield. Keep the focus on what the rhetoric is allowed to risk.",
    },
    5: {
        "materials": "Rungs 1-3 handout, defense examples, subgroup and hindsight rescue cards, debate timer.",
        "questions": [
            "Has the promise already narrowed after the result arrived?",
            "What failure is now being explained away only after the fact?",
            "If I stop at rung 2 or 3, what has already been surrendered?",
        ],
        "watch": "Students may treat subgroup rescue as a trivial refinement. Press whether the original rhetoric was that narrow beforehand.",
    },
    6: {
        "materials": "Rungs 4-5 handout, comfort-language examples, rewrite worksheet, paired sample statements.",
        "questions": [
            "What remains valuable at rung 4?",
            "Why is rung 5 not the same as a public promise succeeding?",
            "How can we speak pastorally without pretending the public promise still stands?",
        ],
        "watch": "Students may think the class is mocking comfort. Keep the distinction explicit and humane.",
    },
    7: {
        "materials": "Student devices, printed case log sheet, annotation worksheet, projector on summary ledger and report.",
        "questions": [
            "Where did I stop earliest, and why?",
            "Which domain tempted me to be most permissive?",
            "What do the three summary boxes show about my overall standard?",
        ],
        "watch": "Students may click fast without reasons. Slow them down and require one sentence of justification for each stop line.",
    },
    8: {
        "materials": "Unlocked reports, biblical parallel handout, asymmetry memo worksheet, projector for reveal state.",
        "questions": [
            "Did my standard change when the verse became biblical?",
            "What special pleading am I tempted to add only now?",
            "What rule should survive the shift from invented scripture to familiar scripture?",
        ],
        "watch": "Students may rush to context before admitting a changed standard. Require the admission first, context second.",
    },
    9: {
        "materials": "Companion field demo, transfer worksheet, domain list, escape-hatch preview cards.",
        "questions": [
            "What live Christian promise should now face the same standard?",
            "Which escape hatch do I expect to reach for once the promise is familiar?",
            "How will I keep the same line when the companion field introduces study choice and excuse drag?",
        ],
        "watch": "Students may treat the mirror as complete in itself. Keep the goal on transfer into the live field.",
    },
    10: {
        "materials": "Capstone checklist, peer-question cards, timer, reflection sheet, optional projector.",
        "questions": [
            "What is my most honest label for this promise now?",
            "Did I keep one standard across invented and familiar cases?",
            "What will I now refuse to call public evidence unless it risks public disappointment?",
        ],
        "watch": "Students may perform certainty. Reward public revision, precise downgrading, and honest transfer instead.",
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
    story.append(P("Promising Gods Mirror<br/>A Full Curriculum", "CoverTitle"))
    story.append(
        PE(
            "A rigorous small-group course for young, honest seekers learning how to detect asymmetry in public promise language before the scripture becomes familiar and protected."
        )
    )
    story.append(
        callout(
            "Core question",
            "If an invented verse promises a visible earthly advantage but the matched result is flat, where would you stop calling it a real promise, and will you keep that same line when the parallel verse is biblical?",
            RUST,
            CREAM,
        )
    )
    story.append(Spacer(1, 0.24 * inch))
    story.append(MirrorMap())
    story.append(Spacer(1, 0.24 * inch))
    story.append(
        PE(
            "This curriculum teaches the contents of Promising Gods Mirror without turning inquiry into sneering or deconversion theater. Students learn to distinguish comfort from public evidence, rhetorical retreat from fulfilled promise, and familiarity from stable standards."
        )
    )

    new_page(story, "Curriculum at a Glance")
    story.append(
        PE(
            "Audience: a small group of young sincere seekers, roughly high school through early college, with mixed belief backgrounds. Recommended size: 6-12 students. Recommended rhythm: ten sessions of 75-90 minutes, plus optional mentor conferences."
        )
    )
    story.append(
        table(
            [
                ["Component", "Design choice"],
                ["Course aim", "Train students to detect where public promise language collapses once the public result stays flat."],
                ["Core habit", "Ask where the promise stops being a real public promise before context rescue and familiarity take over."],
                ["Main tool", "Promising Gods Mirror, including current case, collapse line, verdict box, summary ledger, reveal, report, and handoff to Earthly Promise Test Field."],
                ["Final product", "A completed mirror report plus a short transfer memo into a real Christian promise claim."],
                ["Assessment stance", "Grade clarity, fairness, consistency, and willingness to keep one standard, not the student's final religious conclusion."],
            ],
            [1.35 * inch, 5.15 * inch],
            large=True,
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        cards(
            [
                (
                    "Not a gotcha",
                    "The course does not ridicule comfort, testimony, or scripture. It asks for honest categories and stable standards.",
                    BLUE_SOFT,
                ),
                (
                    "Not apologetics theater",
                    "The course does not assume the answer. It asks whether the rhetoric still deserves to be called a public promise.",
                    GREEN_SOFT,
                ),
                (
                    "Not anti-context",
                    "Context matters, but this curriculum delays context rescue long enough to expose whether the standard changes under familiarity.",
                    GOLD_SOFT,
                ),
            ]
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        callout(
            "Course mantra",
            "A promise can still matter deeply and still lose its status as a public promise. Meaning and public evidence are not the same category.",
            BLUE_MID,
            BLUE_SOFT,
        )
    )

    new_page(story, "Learning Objectives and Standards")
    story.append(
        PE(
            "By the end of the course, students should be able to do the following without needing the teacher to rescue the conversation."
        )
    )
    story.append(
        table(
            [
                ["Domain", "Students can..."],
                ["Claim clarity", "Distinguish public promise language from private meaning, symbol, or pastoral reassurance."],
                ["Asymmetry detection", "Explain how familiarity can loosen standards and how invented cases can reveal that shift."],
                ["Case reading", "Parse verse, public claim, test, observed result, required retreat, and verdict."],
                ["Rung logic", "Explain what each collapse rung concedes and why later rungs are deeper retreats."],
                ["Comfort distinction", "Preserve the reality of comfort without letting comfort continue to count as public evidence."],
                ["Transfer", "Carry the same collapse line into familiar Christian promise language and then into Earthly Promise Test Field."],
                ["Report use", "Use the printable report as a discussion artifact rather than relying on memory or rhetoric."],
                ["Humility", "Revise a favored claim label without shame or performance certainty."],
            ],
            [1.35 * inch, 5.15 * inch],
            large=True,
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        callout(
            "Essential final question",
            "Would I still call this a public promise if the verse came from another religion's holy book and the earthly result remained flat?",
            RUST,
            CREAM,
        )
    )

    new_page(story, "Teacher Preparation")
    story.append(
        PE(
            "The best teacher posture is warm, precise, and brave. Students are being asked to examine sacred language without humiliation and without hidden permission to move the goalposts."
        )
    )
    story.append(
        table(
            [
                ["Before the course", "Concrete preparation"],
                ["Read the manual", "Know the Promising Gods Mirror manual, especially the collapse ladder, report, summary ledger, and companion-field handoff."],
                ["Prepare example cards", "Bring sample Christian promise statements, subgroup rescues, hindsight rescues, comfort rewrites, and transfer prompts."],
                ["Choose norms", "No ridicule. No forced disclosure. No context rescue before first judgment. Revision counts as courage, not defeat."],
                ["Technology", "Have the tool available on a projector and student devices. Keep printed report samples for paper-first students."],
                ["Bridge plan", "Prepare one or two live Christian promise domains to carry into Earthly Promise Test Field in the final sessions."],
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
                "Ask, \"Would you say the same thing if this verse came from another religion?\" when the room gets selective.",
                "Ask, \"What exactly has been surrendered at this rung?\" when students use soft language to hide a retreat.",
                "Ask, \"Is this still public evidence or now comfort?\" whenever categories blur.",
                "Ask, \"Are we explaining the claim or rescuing it after the result?\" when hindsight repairs appear.",
                "Ask, \"What standard will you keep when the parallel verse becomes biblical?\" before the reveal is unlocked.",
            ],
            "Body",
        )
    )
    story.append(
        callout(
            "Teacher warning",
            "Do not let the course become either Bible-proof-text combat or anti-believer performance. The curriculum is about stable standards for public promise language.",
            RUST,
            CREAM,
        )
    )

    new_page(story, "Course Covenant and Room Norms")
    story.append(
        PE(
            "Students need explicit permission to think honestly without treating themselves or others as targets. The room must reward revision, slowed-down thought, and category clarity."
        )
    )
    story.append(
        table(
            [
                ["Norm", "Teacher language"],
                ["No ridicule", "We can pressure a claim without humiliating a person or scorning what still comforts them."],
                ["No forced disclosure", "Students may analyze public examples or hypothetical cases instead of family or church stories."],
                ["No early context rescue", "First say where your line is. Then talk about context and theological nuance."],
                ["No moving goalposts", "If the claim changes after the flat result, name that change as part of the lesson."],
                ["Revision is honorable", "Downgrading a promise from public evidence to comfort may be intellectual progress, not failure."],
                ["One standard", "Invented and familiar scripture should answer to the same basic public-promise rule."],
            ],
            [1.4 * inch, 5.1 * inch],
            large=True,
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        cards(
            [
                ("Warmth", "Protect students from shame and identity threat.", BLUE_SOFT),
                ("Precision", "Require clear labels for each kind of rhetorical move.", GREEN_SOFT),
                ("Courage", "Let sacred-sounding language face the same standard as unfamiliar language.", GOLD_SOFT),
            ]
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        callout(
            "Opening script",
            "This course is not asking you to sneer at scripture or fake neutrality. It is asking you to stop using a claim as public evidence when the only way to keep it alive is to redefine it after the result.",
            RUST,
            CREAM,
        )
    )

    new_page(story, "Vocabulary and Misconception Map")
    story.append(
        PE(
            "Shared language matters. Students cannot think clearly about the ladder if they collapse all categories into one word like promise or faith."
        )
    )
    story.append(
        table(
            [
                ["Term", "Plain meaning", "Common misconception to correct"],
                ["Public promise", "A verse is being used to claim a visible earthly effect.", "Not every spiritually meaningful verse belongs in this category."],
                ["Flat result", "The matched earthly outcome does not show the promised advantage.", "Flat does not mean no stories exist; it means the public pattern does not appear."],
                ["Collapse line", "The first rung where the verse is no longer functioning as a real earthly promise.", "It is not merely the harshest judgment; it is the earliest honest one."],
                ["Subgroup rescue", "The promise survives only for a narrower elite after the outcome is known.", "This is not always harmless clarification."],
                ["Hindsight rescue", "Misses are explained away after the fact by hidden sincerity, hidden sin, or timing language.", "A sincere explanation can still reduce public risk to zero."],
                ["Comfort-only survival", "The verse still comforts, but no longer predicts a public result.", "Comfort can remain real without still counting as public evidence."],
                ["Never-public retreat", "The wording is preserved only by denying that a public promise was ever made.", "This is a rhetorical withdrawal, not a fulfilled public promise."],
            ],
            [1.05 * inch, 2.4 * inch, 3.05 * inch],
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        callout(
            "Vocabulary checkpoint",
            "Before students argue about context, ask which category they are using: public promise, subgroup rescue, hindsight rescue, comfort, or never-public retreat.",
            BLUE_MID,
            BLUE_SOFT,
        )
    )

    new_page(story, "Course Architecture")
    story.append(
        PE(
            "Every week repeats the same pedagogical motion. The course begins with distance, then trains close reading, then forces rung decisions, then brings the familiar verses back into view, and finally transfers the standard into the companion field."
        )
    )
    story.append(MirrorMap())
    story.append(Spacer(1, 8))
    story.append(
        table(
            [
                ["Phase", "What students are learning to do"],
                ["Distance", "Notice how much easier it is to judge a promise when the scripture is unfamiliar."],
                ["Case", "Read the anatomy of verse, claim, test, result, and required retreat carefully."],
                ["Ladder", "Name where a promise stops being public promise language at all."],
                ["Reveal", "Check whether the standard changes when biblical parallels appear."],
                ["Transfer", "Carry the same standard into real Christian promise claims and Earthly Promise Test Field."],
            ],
            [1.1 * inch, 5.4 * inch],
            large=True,
        )
    )

    new_page(story, "Assessment and Capstone")
    story.append(
        PE(
            "The final course product should show both stability and humility. Students are not graded on whether they become believers, skeptics, or remain undecided. They are graded on whether they can keep one honest standard across unfamiliar and familiar promise language."
        )
    )
    story.append(
        table(
            [
                ["Capstone element", "What to look for"],
                ["Completed mirror report", "All nine cases completed with visible stop lines and report output preserved."],
                ["Reasoned verdicts", "Students can explain why each stop line marks the point where the promise ceased to be a real public promise."],
                ["Asymmetry reflection", "Students can name at least one place where familiarity tempted them to relax the standard."],
                ["Transfer memo", "Students can describe how the same line should govern a real Christian promise in Earthly Promise Test Field."],
                ["Public reflection", "Students use calibrated language and do not confuse comfort, meaning, and public evidence."],
            ],
            [1.5 * inch, 5.0 * inch],
            large=True,
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        callout(
            "What strong work looks like",
            "The best capstone does not sound dramatic. It sounds stable. The student can say where the promise collapsed, what still remains meaningful, and why that remainder is no longer the same as a public promise.",
            RUST,
            CREAM,
        )
    )

    for session in SESSIONS:
        session_page(story, session)

    new_page(story, "Session Overview Table")
    story.append(
        table(
            [["Session", "Core content", "Main student artifact"]]
            + [[str(item["number"]), item["title"], item["artifact"]] for item in SESSIONS],
            [0.65 * inch, 3.3 * inch, 2.55 * inch],
            large=True,
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        callout(
            "Closing teacher reminder",
            "Promising Gods Mirror works best when it ends in transfer. Do not let the course stop at clever diagnosis. Move students into the companion field while the asymmetry insight is still alive.",
            BLUE_MID,
            BLUE_SOFT,
        )
    )
    story.append(Spacer(1, 18))
    story.append(P("Curriculum PDF generated from scripts/generate_promising_gods_curriculum.py.", "Tiny"))

    return story


def build_pdf():
    doc = SimpleDocTemplate(
        str(OUTPUT_PDF),
        pagesize=letter,
        leftMargin=0.72 * inch,
        rightMargin=0.72 * inch,
        topMargin=0.72 * inch,
        bottomMargin=0.72 * inch,
        title="Promising Gods Mirror Curriculum",
        author="OpenAI Codex",
        subject="Teacher-facing curriculum for the Promising Gods Mirror tool",
    )
    doc.build(build_story(), onFirstPage=on_first_page, onLaterPages=on_later_pages)


if __name__ == "__main__":
    build_pdf()

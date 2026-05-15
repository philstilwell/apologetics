from __future__ import annotations

from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase.pdfmetrics import stringWidth
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
OUTPUT = ROOT / "assets" / "curricula" / "moral-particulars-audit-curriculum.pdf"

PAGE_W, PAGE_H = letter

ACCENT = colors.HexColor("#b24c4a")
ACCENT_DARK = colors.HexColor("#7f302f")
INK = colors.HexColor("#2b1514")
MUTED = colors.HexColor("#6f4746")
SOFT = colors.HexColor("#fff4f4")
SOFTER = colors.HexColor("#fffafa")
LINE = colors.HexColor("#dfaaa8")
GOLD = colors.HexColor("#9a6b18")
GOLD_SOFT = colors.HexColor("#fff1c8")
BLUE = colors.HexColor("#365f91")
BLUE_SOFT = colors.HexColor("#eef4ff")
GREEN = colors.HexColor("#3d7254")
GREEN_SOFT = colors.HexColor("#edf7f0")
GRAY = colors.HexColor("#f4f4f3")
GRAY_DARK = colors.HexColor("#4b4b4b")
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
            textColor=ACCENT_DARK,
            alignment=TA_CENTER,
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CoverTitle",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=34,
            leading=37,
            textColor=INK,
            alignment=TA_CENTER,
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CoverSub",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=12.5,
            leading=18,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=15,
        )
    )
    styles.add(
        ParagraphStyle(
            name="H1x",
            parent=styles["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=20,
            leading=24,
            textColor=INK,
            spaceBefore=3,
            spaceAfter=7,
        )
    )
    styles.add(
        ParagraphStyle(
            name="H2x",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=13.5,
            leading=16.5,
            textColor=ACCENT_DARK,
            spaceBefore=9,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="H3x",
            parent=styles["Heading3"],
            fontName="Helvetica-Bold",
            fontSize=10.7,
            leading=13,
            textColor=INK,
            spaceBefore=6,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodyX",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.1,
            leading=12.6,
            textColor=INK,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodySmall",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=7.8,
            leading=10.3,
            textColor=INK,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Muted",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11.6,
            textColor=MUTED,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Tiny",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=6.75,
            leading=8.25,
            textColor=MUTED,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CalloutTitle",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9.5,
            leading=11.7,
            textColor=INK,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableHead",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=7.35,
            leading=9.1,
            textColor=WHITE,
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableBody",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=7.1,
            leading=9.1,
            textColor=INK,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableBodyTight",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=6.65,
            leading=8.3,
            textColor=INK,
        )
    )
    return styles


STYLES = build_styles()


def p(text: str, style: str = "BodyX") -> Paragraph:
    return Paragraph(escape(text), STYLES[style])


class AccentRule(Flowable):
    def __init__(self, color=ACCENT):
        super().__init__()
        self.color = color
        self.width = 0

    def wrap(self, avail_width, avail_height):
        self.width = avail_width
        return avail_width, 5

    def draw(self):
        self.canv.setFillColor(self.color)
        self.canv.roundRect(0, 1, self.width, 3, 1.5, fill=1, stroke=0)


class PillRow(Flowable):
    def __init__(self, items, fill=WHITE, stroke=LINE, text=ACCENT_DARK):
        super().__init__()
        self.items = items
        self.fill = fill
        self.stroke = stroke
        self.text = text
        self.width = 0

    def wrap(self, avail_width, avail_height):
        self.width = avail_width
        return avail_width, 23

    def draw(self):
        c = self.canv
        c.setFont("Helvetica-Bold", 6.8)
        x = 0
        for item in self.items:
            label = item.upper()
            width = stringWidth(label, "Helvetica-Bold", 6.8) + 15
            if x + width > self.width:
                break
            c.setFillColor(self.fill)
            c.setStrokeColor(self.stroke)
            c.roundRect(x, 4, width, 15, 7, fill=1, stroke=1)
            c.setFillColor(self.text)
            c.drawCentredString(x + width / 2, 8.5, label)
            x += width + 6


def bullet_list(items, style="BodySmall", left=14):
    return ListFlowable(
        [ListItem(p(item, style), leftIndent=10) for item in items],
        bulletType="bullet",
        leftIndent=left,
        bulletFontName="Helvetica",
        bulletFontSize=6,
        bulletOffsetY=1,
        spaceBefore=1,
        spaceAfter=4,
    )


def numbered_list(items, style="BodySmall"):
    return ListFlowable(
        [ListItem(p(item, style), leftIndent=13) for item in items],
        bulletType="1",
        leftIndent=18,
        bulletFontName="Helvetica-Bold",
        bulletFontSize=7,
        spaceBefore=1,
        spaceAfter=4,
    )


def callout(title, body, color=ACCENT, fill=SOFT):
    table = Table([[p(title, "CalloutTitle")], [p(body, "BodySmall")]], colWidths=[None])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), fill),
                ("BOX", (0, 0), (-1, -1), 0.7, color),
                ("LINEBEFORE", (0, 0), (0, -1), 4, color),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return table


def card(title, body, color=ACCENT, fill=SOFT, width=3.03 * inch):
    inner = Table([[p(title, "CalloutTitle")], [p(body, "BodySmall")]], colWidths=[width])
    inner.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), fill),
                ("BOX", (0, 0), (-1, -1), 0.65, color),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return inner


def two_col(cards):
    rows = []
    for index in range(0, len(cards), 2):
        row = cards[index : index + 2]
        while len(row) < 2:
            row.append(Spacer(1, 1))
        rows.append(row)
    table = Table(rows, colWidths=[3.12 * inch, 3.12 * inch], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 3),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return table


def data_table(data, widths, body_style="TableBody", header=True, header_color=ACCENT_DARK):
    rows = []
    for row_index, row in enumerate(data):
        style = "TableHead" if header and row_index == 0 else body_style
        rows.append([p(str(cell), style) for cell in row])
    table = Table(rows, colWidths=widths, repeatRows=1 if header else 0)
    commands = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.3, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4.2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4.2),
    ]
    if header:
        commands.append(("BACKGROUND", (0, 0), (-1, 0), header_color))
    for row_index in range(1 if header else 0, len(data)):
        if row_index % 2 == 0:
            commands.append(("BACKGROUND", (0, row_index), (-1, row_index), SOFTER))
    table.setStyle(TableStyle(commands))
    return table


def section(story, title, intro=None):
    story.append(p(title, "H1x"))
    story.append(AccentRule())
    story.append(Spacer(1, 5))
    if intro:
        story.append(p(intro, "Muted"))


def h2(story, title):
    story.append(p(title, "H2x"))


def h3(story, title):
    story.append(p(title, "H3x"))


def keep(items):
    return KeepTogether(items)


def on_page(canvas, doc):
    if doc.page == 1:
        return
    canvas.saveState()
    canvas.setFillColor(SOFT)
    canvas.rect(0, PAGE_H - 0.44 * inch, PAGE_W, 0.44 * inch, fill=1, stroke=0)
    canvas.setFillColor(ACCENT)
    canvas.rect(0, PAGE_H - 0.44 * inch, PAGE_W, 0.035 * inch, fill=1, stroke=0)
    canvas.setFont("Helvetica-Bold", 7.8)
    canvas.setFillColor(ACCENT_DARK)
    canvas.drawString(doc.leftMargin, PAGE_H - 0.285 * inch, "Moral Particulars Curriculum")
    canvas.setFont("Helvetica", 7.8)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(PAGE_W - doc.rightMargin, PAGE_H - 0.285 * inch, "Crosshairs Audit Lab")
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.45)
    canvas.line(doc.leftMargin, 0.52 * inch, PAGE_W - doc.rightMargin, 0.52 * inch)
    canvas.setFont("Helvetica", 7.2)
    canvas.setFillColor(MUTED)
    canvas.drawString(
        doc.leftMargin,
        0.34 * inch,
        "For inquiry, formation, and responsible moral reasoning - never for coercion or personal diagnosis.",
    )
    canvas.drawRightString(PAGE_W - doc.rightMargin, 0.34 * inch, f"Page {doc.page}")
    canvas.restoreState()


def cover(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(colors.HexColor("#fff6f6"))
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setFillColor(ACCENT)
    canvas.rect(0, PAGE_H - 1.15 * inch, PAGE_W, 0.12 * inch, fill=1, stroke=0)
    canvas.setFillColor(colors.HexColor("#f7dddd"))
    canvas.circle(PAGE_W - 1.15 * inch, PAGE_H - 1.22 * inch, 0.56 * inch, fill=1, stroke=0)
    canvas.setFillColor(INK)
    canvas.circle(PAGE_W - 1.15 * inch, PAGE_H - 1.22 * inch, 0.40 * inch, fill=1, stroke=0)
    canvas.setFillColor(colors.HexColor("#ffe37a"))
    canvas.setFont("Helvetica-Bold", 25)
    canvas.drawCentredString(PAGE_W - 1.15 * inch, PAGE_H - 1.32 * inch, "X")
    canvas.setFillColor(ACCENT_DARK)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawCentredString(PAGE_W / 2, 1.22 * inch, "CROSSHAIRS AUDIT LAB")
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawCentredString(PAGE_W / 2, 0.96 * inch, "A field course in concrete Christian moral reasoning")
    canvas.restoreState()


SESSIONS = [
    {
        "title": "The Problem of Moral Particulars",
        "aim": "Students see why abstract moral claims become more revealing when placed beside concrete cases.",
        "outcomes": [
            "Distinguish moral slogan, rule, principle, judgment, and explanation.",
            "Explain why hard cases expose hidden dependencies.",
            "Practice treating discomfort as data rather than as defeat.",
        ],
        "prep": "Print the case set. Prepare four neutral examples of abstract claims that become complex in particular cases.",
        "flow": [
            ("0-10", "Opening norm: sincere inquiry is not betrayal."),
            ("10-25", "Mini-lesson on abstraction, particulars, and moral pressure."),
            ("25-45", "Silent first-pass reactions to five cases: no defense yet, only stance and intensity."),
            ("45-65", "Small group sorting: easy, hard, volatile, unclear, and under-described cases."),
            ("65-82", "Whole-group debrief on what changed when cases became concrete."),
            ("82-90", "Exit card: one judgment I hold strongly, one judgment I cannot yet explain."),
        ],
        "questions": [
            "Which cases felt clear before you tried to explain them?",
            "What details did your mind add that were not stated in the moral particular?",
            "What would count as a principled answer rather than a reaction?",
        ],
        "homework": "Write a one-page moral inventory: three strong stances, three hesitations, and one case you want to avoid but should not.",
    },
    {
        "title": "Stance Before Defense",
        "aim": "Students learn to state their actual judgment before supplying an explanation.",
        "outcomes": [
            "Use the stance categories support, oppose, unsure, and qualifier-required.",
            "Separate the written proposition from nearby but different propositions.",
            "Identify when a qualifier changes the claim rather than clarifying it.",
        ],
        "prep": "Prepare four altered versions of one case so students can test how small wording changes move the stance.",
        "flow": [
            ("0-12", "Warm-up: what is the exact sentence asking?"),
            ("12-30", "Mini-lesson on proposition discipline and scope control."),
            ("30-52", "Case surgery: students underline agents, actions, conditions, and moral predicate."),
            ("52-70", "Qualifier lab: students add one qualifier, then test whether they now answer a different question."),
            ("70-86", "Tool demo: every input applies to the selected particular only."),
            ("86-90", "Exit card: the most common way I accidentally changed the question."),
        ],
        "questions": [
            "Are you answering the stated case or a neighboring case?",
            "Is your qualifier morally relevant, emotionally protective, or merely evasive?",
            "What would you need to know before your stance becomes responsible?",
        ],
        "homework": "Choose two cases and write the most careful version of your stance in one sentence each.",
    },
    {
        "title": "Authority Grounders",
        "aim": "Students inspect Scripture, divine command, God's nature, tradition, and pastoral authority without flattening them into one bucket.",
        "outcomes": [
            "Name the difference between text, interpretation, authority, and application.",
            "Recognize when tradition or pastoral trust is doing the work Scripture is credited with doing.",
            "Ask what kind of authority would be sufficient for a concrete judgment.",
        ],
        "prep": "Prepare a simple board with five lanes: Scripture, command, God's nature, tradition, pastors.",
        "flow": [
            ("0-10", "Opening reflection: what makes an answer feel Christian?"),
            ("10-30", "Mini-lesson on authority grounders and interpretive distance."),
            ("30-50", "Grounder card drill: defend the same case from one assigned authority lane."),
            ("50-70", "Mislabeling exercise: students identify when a claimed grounder is really another grounder."),
            ("70-85", "Tool practice with two cases, weighting only authority grounders."),
            ("85-90", "Exit card: one authority lane I over-credit or under-credit."),
        ],
        "questions": [
            "Is the grounder the biblical text, a church interpretation of the text, or trust in a teacher?",
            "Could the same authority grounder support a different conclusion if interpreted differently?",
            "When does deference become moral outsourcing?",
        ],
        "homework": "For one case, write a grounder paragraph that separates text, interpretation, and authority trust.",
    },
    {
        "title": "Conscience, Spirit, Reason, and Love",
        "aim": "Students learn to treat inward and rational grounders as inspectable without dismissing them.",
        "outcomes": [
            "Distinguish conscience from social familiarity, emotional recoil, and spiritual certainty.",
            "Use reason, coherence, consequences, love of neighbor, and flourishing as distinct lanes.",
            "Explain why sincerity does not by itself settle moral accuracy.",
        ],
        "prep": "Prepare examples where conscience and social norm agree, conflict, and become hard to separate.",
        "flow": [
            ("0-10", "Check-in: one case where my conscience speaks loudly."),
            ("10-28", "Mini-lesson on inward witness and public reasons."),
            ("28-48", "Human slider line: students physically locate grounder strength from 0 to 10."),
            ("48-68", "Reason and love test: does the same judgment survive when translated into harm, coherence, and neighbor-love language?"),
            ("68-84", "Tool practice: map three non-authority grounders for one case."),
            ("84-90", "Exit card: which lane is hardest for me to separate from the others?"),
        ],
        "questions": [
            "What makes a feeling morally informative rather than merely intense?",
            "Can love of neighbor oppose what my community taught me?",
            "When consequences matter, how do we keep them from becoming pure expediency?",
        ],
        "homework": "Write one paragraph on a case where conscience and reason point in different directions.",
    },
    {
        "title": "Slider Discipline and Weighting",
        "aim": "Students learn that a grounder can be present, dominant, weak, or merely ornamental.",
        "outcomes": [
            "Use 0-10 weights as comparative estimates, not false precision.",
            "Explain the difference between total weight, average weight, and coverage.",
            "Identify when too many high sliders hide a lack of discrimination.",
        ],
        "prep": "Prepare three sample profiles: Scripture-first, Spirit and conscience, Reason and harm.",
        "flow": [
            ("0-12", "Warm-up: what does a 7 mean that a 4 does not mean?"),
            ("12-30", "Mini-lesson on disciplined estimation."),
            ("30-48", "Profile seeding: students apply one starter profile, then revise it."),
            ("48-65", "Calibration drill: compare two students' maps without asking who is right."),
            ("65-82", "Coverage preview: why one giant case is different from five moderate cases."),
            ("82-90", "Exit card: one slider I moved after realizing it was decorative."),
        ],
        "questions": [
            "Would your judgment change if this grounder were removed?",
            "Is the slider high because the grounder is decisive or because it sounds respectable?",
            "Which grounder carries load across cases rather than in only one case?",
        ],
        "homework": "Map three cases privately and write two sentences explaining the lead grounder in each.",
    },
    {
        "title": "Disagreement Diagnosis",
        "aim": "Students learn to explain disagreement without laziness, contempt, or premature soul-reading.",
        "outcomes": [
            "Use disagreement families: soul, method, social, affective, and mixed explanations.",
            "Distinguish unfamiliarity, confusion, competing interpretation, rebellion, and trauma.",
            "Practice charitable diagnosis that still permits serious moral critique.",
        ],
        "prep": "Prepare anonymized disagreement statements for three cases.",
        "flow": [
            ("0-10", "Opening rule: no diagnosing classmates."),
            ("10-30", "Mini-lesson on explaining disagreement responsibly."),
            ("30-50", "Disagreement court: teams argue for different diagnoses of the same dissent."),
            ("50-70", "Charity pass: students rewrite the harshest diagnosis into a fairer possible account."),
            ("70-84", "Tool practice: add disagreement ratings for two mapped cases."),
            ("84-90", "Exit card: the diagnosis I reach for too quickly."),
        ],
        "questions": [
            "What evidence would justify a spiritual diagnosis rather than a methodological one?",
            "Could someone know the same texts and still disagree because they interpret differently?",
            "When is charity honest, and when is it avoidance?",
        ],
        "homework": "Write the strongest non-rebellious explanation for someone disagreeing with one of your strong stances.",
    },
    {
        "title": "Difficult Cases and Moral Safety",
        "aim": "Students learn to inspect severe moral propositions without dramatizing, advocating, or dehumanizing.",
        "outcomes": [
            "Use slow reading and safety pauses for violent or identity-targeting claims.",
            "Distinguish analysis of a proposition from permission to enact it.",
            "Name moral risks in speech, humor, certainty, and group pressure.",
        ],
        "prep": "Mark the most volatile cases. Prepare a calm opt-out procedure that preserves participation through written reflection.",
        "flow": [
            ("0-12", "Safety covenant review and consent to serious inquiry."),
            ("12-28", "Mini-lesson on analytical distance and moral responsibility."),
            ("28-45", "Case triage: students identify what makes a case ethically dangerous to discuss poorly."),
            ("45-68", "Slow map: one difficult case is read, paraphrased, bounded, and mapped."),
            ("68-82", "Debrief: what helped maintain seriousness?"),
            ("82-90", "Exit card: one guardrail I need for honest work."),
        ],
        "questions": [
            "What harm could come from treating this case casually?",
            "What does the proposition actually permit, forbid, or require?",
            "Which grounders would need overwhelming force before coercion or violence could be justified?",
        ],
        "homework": "Write a safety memo: how should a sincere group handle one volatile case without evasion or cruelty?",
    },
    {
        "title": "Cross-Case Consistency",
        "aim": "Students learn to compare cases for pattern drift, special pleading, and unstable disagreement explanations.",
        "outcomes": [
            "Identify nearby cases that should probably receive similar treatment.",
            "Notice when the grounder changes because the conclusion is desired.",
            "Use pattern checks as prompts for revision rather than accusations.",
        ],
        "prep": "Choose three case clusters: violence, sexuality, social belonging, civic obedience, generosity.",
        "flow": [
            ("0-10", "Warm-up: one consistency test I find threatening."),
            ("10-30", "Mini-lesson on case adjacency and moral analogies."),
            ("30-52", "Cluster map: students group cases by moral feature rather than by topic label."),
            ("52-70", "Drift hunt: compare grounders and disagreement diagnoses across a cluster."),
            ("70-84", "Revision round: students adjust one stance, slider, or qualifier."),
            ("84-90", "Exit card: one pattern I did not expect to see."),
        ],
        "questions": [
            "Which two cases are more structurally similar than they first appeared?",
            "Where did your disagreement diagnosis become harsher when the topic changed?",
            "What stable principle would explain both judgments?",
        ],
        "homework": "Write a pattern-drift memo comparing two cases and identifying the most honest explanation for the difference.",
    },
    {
        "title": "The Grounder Concentration Map",
        "aim": "Students learn to read the graph as a dependency map rather than as decoration.",
        "outcomes": [
            "Explain total weight, average weight, coverage, concentration, and unused lanes.",
            "Recognize the difference between broad dependence and narrow dependence.",
            "Use the map to ask what would happen if a lead grounder were disputed.",
        ],
        "prep": "Prepare one sample map with a broad grounder and one with a concentrated grounder.",
        "flow": [
            ("0-10", "Warm-up: what would make a moral map fragile?"),
            ("10-28", "Mini-lesson on concentration and effective spread."),
            ("28-48", "Graph reading drill: students interpret lane height, weight, and coverage."),
            ("48-68", "Stress question: if this grounder failed, how many judgments remain supported?"),
            ("68-84", "Tool practice: students read their own concentration map."),
            ("84-90", "Exit card: the lane my map leans on most."),
        ],
        "questions": [
            "Is this grounder used often, or is it powerful in only one case?",
            "Does high average weight mean broad support or concentrated dependence?",
            "Which unused lanes might represent genuine absence, and which might represent under-reflection?",
        ],
        "homework": "Write a graph interpretation paragraph: where the ledger leans and what that reveals.",
    },
    {
        "title": "Report, AI Critique, and Intellectual Honesty",
        "aim": "Students learn to export, critique, and revise their maps without outsourcing judgment.",
        "outcomes": [
            "Use the report as an audit trail of reasoning, not as a verdict.",
            "Prompt an LLM for critique while retaining responsibility for final judgment.",
            "Separate valid criticism from noise, flattening, or misunderstanding.",
        ],
        "prep": "Prepare a sample structured stress-test prompt and two different AI-style critiques of it.",
        "flow": [
            ("0-10", "Opening question: what would I want a fair critic to notice?"),
            ("10-25", "Mini-lesson on report reading and critique prompts."),
            ("25-45", "Critique triage: mark comments as relevant, mistaken, too vague, or revision-worthy."),
            ("45-65", "Revision lab: students make two changes and write why."),
            ("65-82", "Pair share: defend one revision and one non-revision."),
            ("82-90", "Exit card: a criticism I resisted but should consider."),
        ],
        "questions": [
            "Did the critic challenge your reasoning or merely your conclusion?",
            "What criticism would change a slider rather than a stance?",
            "When is refusing to revise an act of integrity rather than stubbornness?",
        ],
        "homework": "Generate or simulate a critique of your map and write a revision log with at least three entries.",
    },
    {
        "title": "Final Dossier Workshop",
        "aim": "Students assemble a disciplined account of what their moral map reveals.",
        "outcomes": [
            "Produce a coherent personal moral-particulars dossier.",
            "Explain one strengthened conviction, one softened stance, and one unresolved question.",
            "Use evidence from the tool rather than vague self-description.",
        ],
        "prep": "Print the dossier template and assessment rubric.",
        "flow": [
            ("0-12", "Review final dossier components."),
            ("12-32", "Silent assembly: map summary, lead grounders, disagreement profile, concentration insight."),
            ("32-55", "Peer protocol: one clarifying question, one charitable challenge, one suggested revision."),
            ("55-75", "Writing sprint: students revise the final reflection."),
            ("75-88", "Voluntary read-aloud of one insight."),
            ("88-90", "Closing line: what honesty now asks of me."),
        ],
        "questions": [
            "What did your map reveal that your first reactions hid?",
            "Which change represents growth rather than social pressure?",
            "What remains unresolved in a way that deserves respect?",
        ],
        "homework": "Finish the final dossier and prepare a three-minute presentation.",
    },
    {
        "title": "Presentation and Sending",
        "aim": "Students present mature, bounded reflections and leave with practices for future moral inquiry.",
        "outcomes": [
            "Communicate a moral map without weaponizing it.",
            "Receive critique with composure and answer without defensiveness.",
            "Name next practices for Scripture, dialogue, research, and self-examination.",
        ],
        "prep": "Arrange the room for short presentations. Prepare certificates or letters if appropriate.",
        "flow": [
            ("0-10", "Opening reminder: presentation is testimony to inquiry, not courtroom victory."),
            ("10-62", "Three-minute presentations with two-minute response windows."),
            ("62-76", "Group synthesis: common grounders, common drift points, and hardest disagreements."),
            ("76-86", "Next-practice planning: each student chooses a 30-day inquiry habit."),
            ("86-90", "Closing blessing or secular equivalent: courage, humility, and care."),
        ],
        "questions": [
            "What did you learn about your own moral machinery?",
            "Where did your charity become more disciplined?",
            "What question will you continue carrying responsibly?",
        ],
        "homework": "Optional: revisit the map after 30 days and write a one-page follow-up.",
    },
]


GROUNDERS = [
    ("Scripture", "Canonical texts and their apparent force in the case."),
    ("God's nature", "Claims about divine character, holiness, justice, mercy, or goodness."),
    ("Divine command", "A perceived divine requirement or prohibition."),
    ("Holy Spirit", "Inner guidance, conviction, illumination, or spiritual prompting."),
    ("Conscience", "Inward moral awareness, recoil, guilt, or felt obligation."),
    ("Church tradition", "Inherited doctrine, practice, councils, teachers, or denominational memory."),
    ("Pastoral authority", "Trust in pastors, elders, priests, mentors, or ecclesial guides."),
    ("Reason", "Logical coherence, analogy, consistency, and public argument."),
    ("Love of neighbor", "Neighbor-directed care, mercy, protection, and respect."),
    ("Human flourishing", "Well-being, formation, vocation, community, and long-term good."),
    ("Social norms", "Community expectations, inherited propriety, and familiar moral boundaries."),
    ("Consequences", "Expected outcomes, harms, benefits, incentives, and practical effects."),
]


DIAGNOSES = [
    ("Spiritual rebellion", "The dissenter is resisting God, authority, or moral truth."),
    ("Unredeemed soul", "Disagreement is attributed to lacking regeneration or spiritual transformation."),
    ("Scripture unfamiliarity", "The dissenter does not know relevant texts or teachings."),
    ("Interpretive confusion", "The dissenter uses mistaken hermeneutics or misreads context."),
    ("Intellectual confusion", "The dissenter is reasoning poorly, inconsistently, or incompletely."),
    ("Different facts", "The disagreement turns on empirical claims, not only moral principles."),
    ("Social formation", "Community, family, media, or culture shaped the person's reaction."),
    ("Affective resistance", "Fear, disgust, pain, loyalty, trauma, or desire shapes the response."),
    ("Moral intuition conflict", "The dissenter has a different ordering of mercy, justice, liberty, purity, and harm."),
    ("Reasoned alternative", "The dissenter may have coherent grounds even if one rejects them."),
]


CASES = [
    (
        "1a",
        "It would be immoral not to kill abortion doctors if it protected the unborn.",
        "Tests whether fetal-personhood commitments imply private lethal obligation, and what blocks that implication.",
    ),
    (
        "1b",
        "It would be morally permissible to kill abortion doctors if it protected the unborn.",
        "Tests the distance between obligation, permission, vigilantism, and ordinary prohibitions on killing.",
    ),
    (
        "2",
        "It is immoral for divorced individuals to remarry.",
        "Tests how texts, exceptions, covenant categories, and pastoral harm are weighted.",
    ),
    (
        "3",
        "It is immoral to have meals with apostates from Christianity.",
        "Tests the difference between moral contamination, church discipline, hospitality, and ordinary friendship.",
    ),
    (
        "4",
        "It is immoral to knowingly exceed speed limits.",
        "Tests whether civil law carries moral force when violation is common, minor, or socially tolerated.",
    ),
    (
        "5",
        "It is immoral for married couples to engage in oral or anal sex.",
        "Tests how natural-law reasoning, consent, scriptural silence, tradition, and disgust responses are separated.",
    ),
    (
        "6",
        "It is immoral to practice circumcision or clitoridectomies.",
        "Tests whether bundled practices are judged by the same principle or by different facts about harm, consent, covenant, and anatomy.",
    ),
    (
        "7",
        "It would be moral for a government to kill homosexuals for being homosexual.",
        "Tests whether historical texts, civil law categories, and modern scope limits can be applied without special pleading.",
    ),
    (
        "8",
        "It is immoral to intentionally make someone believe you feel the opposite of what you actually feel about something.",
        "Tests how deception, privacy, tact, safety, emotional labor, and truthfulness are ranked.",
    ),
    (
        "9",
        "It is immoral to spend this earthly life enjoying earthly pleasures when unGospelled unbelievers face eternity in Hell, when you will have eternity in Heaven to relax.",
        "Tests whether eternal stakes imply maximal evangelistic sacrifice, and what principle permits ordinary enjoyment.",
    ),
    (
        "10",
        "It is immoral to fight for a country in a war merely for more territory.",
        "Tests just-war reasoning, obedience to authority, loyalty, and the morality of aggression.",
    ),
    (
        "11",
        "It is immoral to divorce over a spouse merely romantically kissing another individual.",
        "Tests how adultery, betrayal, covenant rupture, forgiveness, safety, and proportionality are defined.",
    ),
    (
        "12",
        "It is immoral not to send money to help someone you know who is starving to death.",
        "Tests whether proximity, ability, sacrifice, stewardship, and love of neighbor create a concrete duty.",
    ),
]


ASSESSMENT_ROWS = [
    ["Dimension", "Excellent", "Developing", "Needs attention"],
    [
        "Claim precision",
        "Answers the stated case and names scope limits.",
        "Mostly answers the case but drifts under pressure.",
        "Substitutes a neighboring claim or slogan.",
    ],
    [
        "Grounder honesty",
        "Weights match the actual dependence of the judgment.",
        "Grounders are plausible but sometimes decorative.",
        "Invokes respectable sources without showing load.",
    ],
    [
        "Disagreement charity",
        "Can explain sincere dissent without contempt or evasion.",
        "Shows charity but still overuses one diagnosis.",
        "Defaults to soul-reading, mockery, or dismissal.",
    ],
    [
        "Cross-case reasoning",
        "Identifies pattern drift and revises responsibly.",
        "Notices some drift but explains it thinly.",
        "Treats each case in isolation to avoid pressure.",
    ],
    [
        "Revision quality",
        "Changes are principled and documented.",
        "Some changes are defensible but under-explained.",
        "Changes are absent, reactive, or socially driven.",
    ],
]


def add_session(story, index, session):
    section(story, f"Session {index}. {session['title']}", session["aim"])
    story.append(
        two_col(
            [
                card("Core objective", session["aim"], ACCENT, SOFT),
                card("Teacher preparation", session["prep"], BLUE, BLUE_SOFT),
            ]
        )
    )
    h2(story, "Learning Outcomes")
    story.append(bullet_list(session["outcomes"], "BodySmall"))
    h2(story, "90-Minute Flow")
    story.append(
        data_table(
            [["Time", "Move"]] + session["flow"],
            [0.85 * inch, 5.35 * inch],
            "TableBody",
        )
    )
    h2(story, "High-Yield Questions")
    story.append(bullet_list(session["questions"], "BodySmall"))
    story.append(callout("Between-session assignment", session["homework"], GREEN, GREEN_SOFT))
    story.append(PageBreak())


def build_story():
    story = []
    story.append(Spacer(1, 1.45 * inch))
    story.append(p("MORAL PARTICULARS AUDIT", "CoverKicker"))
    story.append(p("Curriculum for Young Honest Seekers", "CoverTitle"))
    story.append(
        p(
            "A complete 12-session field course for teaching concrete Christian moral reasoning, grounder mapping, disagreement diagnosis, and cross-case integrity.",
            "CoverSub",
        )
    )
    story.append(PillRow(["12 sessions", "small group", "teacher guide", "assignments", "rubrics", "templates"]))
    story.append(Spacer(1, 0.42 * inch))
    story.append(
        callout(
            "The course in one sentence",
            "Students learn to inspect what actually carries their moral judgments when abstract Christian claims become concrete moral particulars.",
            ACCENT,
            SOFT,
        )
    )
    story.append(Spacer(1, 0.15 * inch))
    story.append(
        callout(
            "Best use",
            "Run this as a moral reasoning lab: serious, creative, concrete, charitable, and unwilling to hide behind slogans.",
            BLUE,
            BLUE_SOFT,
        )
    )
    story.append(Spacer(1, 0.15 * inch))
    story.append(p("Public tool: https://xhairs.com/apps/moral-particulars-audit/", "Muted"))
    story.append(PageBreak())

    section(
        story,
        "How to Use This Curriculum",
        "This curriculum is designed for a dynamic teacher leading 6-12 young seekers through honest moral inquiry. It is intentionally rigorous, but it should feel like a lab, studio, and seminar rather than a lecture series.",
    )
    story.append(
        data_table(
            [
                ["Part", "What it gives the teacher"],
                ["Pages 3-7", "Philosophy, safety, outcomes, pacing, and teacher posture."],
                ["Sessions 1-12", "Full lesson plans with objectives, timing, questions, and homework."],
                ["Tool literacy", "Grounders, disagreement diagnoses, graph reading, and report interpretation."],
                ["Assessment", "Assignments, rubrics, final dossier, and presentation guidance."],
                ["Appendices", "Templates, discussion protocols, adaptations, and troubleshooting moves."],
            ],
            [1.1 * inch, 5.1 * inch],
        )
    )
    story.append(
        two_col(
            [
                card(
                    "For sincere seekers",
                    "The course respects unresolved questions and treats doubt, conviction, and revision as morally serious data.",
                    GREEN,
                    GREEN_SOFT,
                ),
                card(
                    "For Christian settings",
                    "The course does not mock faith commitments. It asks whether those commitments can be named, weighted, compared, and revised with integrity.",
                    ACCENT,
                    SOFT,
                ),
                card(
                    "For mixed groups",
                    "The design avoids requiring theological agreement. Students can map Christian claims from inside, outside, or at the threshold of belief.",
                    BLUE,
                    BLUE_SOFT,
                ),
                card(
                    "For creative teachers",
                    "Every session includes movement, role play, mapping, quiet writing, and disciplined conversation.",
                    GOLD,
                    GOLD_SOFT,
                ),
            ]
        )
    )
    story.append(
        callout(
            "Non-negotiable norm",
            "No participant may use the tool to diagnose another participant's soul, pressure someone into a stance, or turn severe moral cases into entertainment.",
            ACCENT,
            SOFT,
        )
    )
    story.append(PageBreak())

    section(
        story,
        "Pedagogical Philosophy",
        "The course assumes that moral maturity grows when students can slow down, name what is doing the work, test consistency, and revise without shame.",
    )
    story.append(
        bullet_list(
            [
                "Concrete cases expose hidden dependencies. A general claim may sound stable until it meets a violent, sexual, civic, generosity, or belonging case.",
                "A moral stance is not yet a moral explanation. Students first identify the judgment, then identify what carries it.",
                "Grounders are plural. Scripture, conscience, tradition, reason, love, authority, and consequences can cooperate or compete.",
                "Disagreement diagnoses are morally loaded. Explaining why someone disagrees can reveal as much as the judgment itself.",
                "Graphs are not decoration. Concentration, coverage, and pattern drift show where the moral ledger leans.",
                "Revision is not defeat. A student may strengthen, soften, qualify, or suspend a judgment as an act of integrity.",
            ],
            "BodyX",
        )
    )
    story.append(
        callout(
            "What the teacher protects",
            "The teacher protects seriousness, charity, exactness, and agency. The teacher does not protect students from every discomfort, and does not let discomfort become permission for cruelty.",
            BLUE,
            BLUE_SOFT,
        )
    )
    h2(story, "Course Values")
    story.append(
        data_table(
            [
                ["Value", "Classroom meaning"],
                ["Precision", "Students answer the stated moral particular before expanding or revising it."],
                ["Charity", "Students try to understand sincere disagreement before explaining it away."],
                ["Courage", "Students do not avoid hard cases merely because the map may reveal tension."],
                ["Humility", "Students treat their own certainty as inspectable."],
                ["Responsibility", "No map is a permission slip. Students remain answerable for moral speech and action."],
            ],
            [1.25 * inch, 4.95 * inch],
        )
    )
    story.append(PageBreak())

    section(story, "Course Architecture", "The design follows a spiral: stance, grounders, disagreement, hard cases, patterns, critique, revision, and public reflection.")
    story.append(
        data_table(
            [
                ["Unit", "Sessions", "Main question", "Deliverable"],
                ["Orientation", "1-2", "What exactly do I think?", "Initial moral inventory"],
                ["Grounders", "3-5", "What carries that judgment?", "Grounder autopsy"],
                ["Disagreement", "6-7", "How do I explain dissent responsibly?", "Charity memo and safety memo"],
                ["Patterns", "8-9", "Does my reasoning drift across cases?", "Pattern-drift memo"],
                ["Critique", "10", "What would a fair critic notice?", "Revision log"],
                ["Synthesis", "11-12", "What has honest inspection revealed?", "Final dossier and presentation"],
            ],
            [1.1 * inch, 0.9 * inch, 2.35 * inch, 1.85 * inch],
            "TableBodyTight",
        )
    )
    h2(story, "Minimum Materials")
    story.append(
        bullet_list(
            [
                "One laptop or tablet connected to the Moral Particulars Audit.",
                "Printed case set, grounder list, disagreement diagnosis list, and final dossier template.",
                "Sticky notes or index cards for grounder sorting and disagreement court.",
                "A visible 0-10 line on the floor or wall for human slider exercises.",
                "Private writing space. Students need some answers that are not performed for peers.",
            ],
            "BodySmall",
        )
    )
    h2(story, "Recommended Pacing")
    story.append(
        data_table(
            [
                ["Format", "Use when", "Adjustment"],
                ["12 weeks", "Best default for deep formation.", "Use one session per week plus homework."],
                ["6 weeks", "School club or short cohort.", "Combine pairs: 1-2, 3-4, 5-6, 7-8, 9-10, 11-12."],
                ["Weekend intensive", "Retreat context.", "Use fewer cases, more private writing, and strong safety boundaries."],
                ["Semester course", "Academic setting.", "Add readings in ethics, hermeneutics, epistemology, and moral psychology."],
            ],
            [1.25 * inch, 2.35 * inch, 2.6 * inch],
            "TableBodyTight",
        )
    )
    story.append(PageBreak())

    section(
        story,
        "The Moral Particulars Case Set",
        "The cases are intentionally uneven. Some are ordinary, some severe, some sexual, some civic, some generosity-centered, and some volatile. That mix is the point: students learn whether their moral method stays principled across different kinds of pressure.",
    )
    story.append(
        data_table(
            [["Case", "Moral particular", "Pedagogical pressure"]] + CASES,
            [0.55 * inch, 3.35 * inch, 2.3 * inch],
            "TableBodyTight",
        )
    )
    story.append(
        callout(
            "Handling note",
            "Several propositions involve violence, sexuality, bodily alteration, or severe exclusion. The teacher should frame these as objects of moral analysis, never as prompts for fantasy, mockery, or advocacy.",
            ACCENT,
            SOFT,
        )
    )
    story.append(PageBreak())

    section(story, "Learning Outcomes and Assessment", "The course measures growth in disciplined moral inquiry, not ideological conformity.")
    story.append(
        data_table(
            [
                ["Outcome", "Evidence of learning"],
                ["Claim discipline", "Student can answer the written proposition without quietly replacing it."],
                ["Grounder literacy", "Student can distinguish authority, inward, rational, communal, and consequence grounders."],
                ["Weighting judgment", "Student can defend why one slider is stronger than another."],
                ["Disagreement charity", "Student can explain sincere dissent without contempt or evasion."],
                ["Pattern awareness", "Student can identify cross-case drift and test whether it is justified."],
                ["Revision integrity", "Student can document a principled change, non-change, or unresolved question."],
            ],
            [1.7 * inch, 4.5 * inch],
        )
    )
    h2(story, "Major Assignments")
    story.append(
        data_table(
            [
                ["Assignment", "Due", "Purpose"],
                ["Initial moral inventory", "After Session 1", "Capture first-pass stances before group influence."],
                ["Grounder autopsy", "After Session 4", "Explain one strong judgment by separating real from decorative grounders."],
                ["Disagreement charity memo", "After Session 6", "Write a fair non-contemptuous explanation of dissent."],
                ["Pattern-drift memo", "After Session 8", "Compare two cases and inspect why reasoning changed."],
                ["Critique and revision log", "After Session 10", "Record fair criticism and principled revisions."],
                ["Final dossier", "Session 12", "Present the completed moral map and reflective synthesis."],
            ],
            [1.9 * inch, 1.2 * inch, 3.1 * inch],
            "TableBodyTight",
        )
    )
    story.append(callout("Assessment posture", "Grade or respond to precision, honesty, charity, and rigor. Do not grade students for landing on the teacher's preferred moral conclusions.", ACCENT, SOFT))
    story.append(PageBreak())

    section(story, "Teacher Posture and Safety", "The teacher's energy matters. A dynamic teacher can make the room alive, but the energy must serve inquiry rather than performance.")
    story.append(
        two_col(
            [
                card("Be vivid", "Use stories, movement, examples, and role play. Let the room feel awake.", GREEN, GREEN_SOFT),
                card("Be bounded", "Make it clear when a case involves violence, shame, identity, or trauma. Slow the pace.", ACCENT, SOFT),
                card("Be Socratic", "Ask what follows, what changes, and what carries the judgment.", BLUE, BLUE_SOFT),
                card("Be humane", "Protect students from contempt, humiliation, and spiritual bullying.", GOLD, GOLD_SOFT),
            ]
        )
    )
    h2(story, "Group Covenant")
    story.append(
        numbered_list(
            [
                "We answer the stated case before changing it.",
                "We do not diagnose classmates' souls.",
                "We distinguish analyzing a moral proposition from endorsing an action.",
                "We do not use jokes to manage discomfort in severe cases.",
                "We may pass publicly and write privately.",
                "We revise without shame and hold conviction without swagger.",
                "We treat disagreement as morally significant data, not as an excuse for contempt.",
            ]
        )
    )
    story.append(
        callout(
            "Safety pause script",
            "Pause. The room is moving too quickly for the seriousness of this case. We are going to restate the proposition, name the potential harm in discussing it poorly, and proceed only with analytical care.",
            ACCENT,
            SOFT,
        )
    )
    story.append(PageBreak())

    for index, session in enumerate(SESSIONS, 1):
        add_session(story, index, session)

    section(story, "Tool Literacy: The Map as a Moral Ledger", "Students need enough technical literacy to understand what the tool is showing without turning numbers into false certainty.")
    story.append(
        data_table(
            [
                ["Element", "Meaning", "Teacher prompt"],
                ["Mapped case", "A case with stance, at least one grounder, and disagreement input.", "Is this case complete enough to compare?"],
                ["Lead grounder", "The grounder with the strongest current weight.", "Would the judgment remain if this grounder weakened?"],
                ["Coverage", "How many mapped cases use a lane with nonzero weight.", "Is this broad dependence or a one-case spike?"],
                ["Average weight", "Total weight divided by mapped cases.", "Does the lane shape the whole ledger or only one judgment?"],
                ["Concentration", "Visible weight carried by few cases.", "Is the map fragile at this point?"],
                ["Pattern drift", "Grounders or diagnoses changing across similar cases.", "Is the difference principled or convenient?"],
            ],
            [1.15 * inch, 2.45 * inch, 2.6 * inch],
            "TableBodyTight",
        )
    )
    story.append(
        callout(
            "Numerical humility",
            "The sliders are disciplined estimates. They help students compare their own judgments; they do not turn moral reasoning into measurement science.",
            BLUE,
            BLUE_SOFT,
        )
    )
    h2(story, "Interpreting the Grounder Concentration Map")
    story.append(
        bullet_list(
            [
                "Lane position identifies the grounder family.",
                "Height shows average or visible weight.",
                "Point or line thickness shows how many mapped cases depend on that grounder.",
                "A high lane with low coverage can mean fragile concentration.",
                "A moderate lane with broad coverage can mean a stable background dependency.",
                "Unused lanes may reveal genuine non-dependence or simply under-reflection.",
            ],
            "BodySmall",
        )
    )
    story.append(PageBreak())

    section(story, "Grounder Field Guide", "These definitions should be taught as inspectable lanes, not as boxes students must fill to sound complete.")
    story.append(data_table([["Grounder", "What to ask"]] + GROUNDERS, [1.45 * inch, 4.75 * inch], "TableBodyTight"))
    story.append(
        callout(
            "Grounder integrity test",
            "For each high slider ask: If this grounder were disputed, would my judgment weaken, change, or remain basically intact? The answer reveals whether the slider is carrying real load.",
            GREEN,
            GREEN_SOFT,
        )
    )
    story.append(PageBreak())

    section(story, "Disagreement Diagnosis Field Guide", "The course should make students slower and fairer when explaining why someone disagrees.")
    story.append(data_table([["Diagnosis", "Responsible use"]] + DIAGNOSES, [1.65 * inch, 4.55 * inch], "TableBodyTight"))
    story.append(
        callout(
            "The soul-reading boundary",
            "Students may study spiritual explanations as part of Christian moral reasoning, but they may not assign those explanations to classmates. The classroom trains categories, not accusations.",
            ACCENT,
            SOFT,
        )
    )
    story.append(PageBreak())

    section(story, "Activity Bank", "Use these activities whenever a session needs more movement, creativity, or pressure testing.")
    story.append(
        data_table(
            [
                ["Activity", "How it works", "Best use"],
                ["Human slider line", "Students stand from 0 to 10 for a grounder, then explain why they stood there.", "Slider calibration"],
                ["Grounder cards", "Students draw one grounder and must argue how it could carry or fail to carry a case.", "Grounder literacy"],
                ["Disagreement court", "Teams argue different disagreement diagnoses, then the class evaluates evidence.", "Charity and precision"],
                ["Moral X-ray", "Students label visible claim, hidden assumptions, emotional force, authority source, and imagined dissenter.", "Hard cases"],
                ["Case transplant", "Move one principle into a different topic area and test whether it survives.", "Pattern drift"],
                ["One-grounder removal", "Erase the strongest grounder and ask what remains.", "Dependency testing"],
                ["Silent map first", "Students map privately before group discussion.", "Reducing conformity pressure"],
                ["Revision witness", "A partner records what changed and why.", "Revision integrity"],
            ],
            [1.25 * inch, 3.25 * inch, 1.7 * inch],
            "TableBodyTight",
        )
    )
    story.append(PageBreak())

    section(story, "Assignments in Full", "These assignments produce the evidence for the final dossier.")
    assignments = [
        ("Initial moral inventory", "List every case as support, oppose, unsure, or qualifier-required. Add one sentence on emotional intensity and one sentence on needed information."),
        ("Grounder autopsy", "Choose one strong judgment. Identify the top three grounders, explain why each has its weight, and name one grounder that sounds relevant but is not actually doing much work."),
        ("Disagreement charity memo", "Choose one person who might sincerely disagree. Explain that disagreement without contempt, without evasion, and without assuming stupidity."),
        ("Pattern-drift memo", "Compare two cases. Describe the relevant similarity, the difference in stance or grounders, and whether the difference is principled."),
        ("Critique and revision log", "Use a peer, teacher, or LLM critique. Record at least three criticisms, your response, and any resulting map change."),
        ("Final dossier", "Submit the map, report, concentration interpretation, strongest judgment, revised judgment, unresolved question, and final reflection."),
    ]
    story.append(data_table([["Assignment", "Instructions"]] + assignments, [1.55 * inch, 4.65 * inch], "TableBodyTight"))
    story.append(
        callout(
            "Feedback rule",
            "Respond to the quality of reasoning. A teacher can challenge a conclusion, but the formal feedback should reward clarity, honesty, charity, and responsible revision.",
            BLUE,
            BLUE_SOFT,
        )
    )
    story.append(PageBreak())

    section(story, "Assessment Rubric", "Use this rubric for written work, presentations, and teacher conferences.")
    story.append(data_table(ASSESSMENT_ROWS, [1.15 * inch, 1.85 * inch, 1.65 * inch, 1.55 * inch], "TableBodyTight"))
    h2(story, "Suggested Weights")
    story.append(
        data_table(
            [
                ["Category", "Weight"],
                ["Participation and preparation", "15 percent"],
                ["Short assignments", "30 percent"],
                ["Revision log", "15 percent"],
                ["Final dossier", "30 percent"],
                ["Final presentation", "10 percent"],
            ],
            [2.4 * inch, 1.5 * inch],
        )
    )
    story.append(
        callout(
            "Alternate non-grade model",
            "For church, home, or informal cohorts, replace grades with three marks: clear, honest, and revisable. Students pass when their work displays all three.",
            GREEN,
            GREEN_SOFT,
        )
    )
    story.append(PageBreak())

    section(story, "Final Dossier Template", "The final dossier is the durable product of the course.")
    story.append(
        data_table(
            [
                ["Section", "Student response"],
                ["Map summary", "How many cases were mapped, and which cases received the most attention?"],
                ["Top grounders", "Which lanes carried the most weight, and why?"],
                ["Disagreement profile", "Which diagnosis families appeared most often?"],
                ["Concentration insight", "Where does the grounder ledger lean? Is that dependence broad or narrow?"],
                ["Strengthened conviction", "What judgment became more stable after inspection?"],
                ["Softened or revised judgment", "What changed, and why was the change principled?"],
                ["Unresolved question", "What remains genuinely open?"],
                ["Next practice", "What will the student study, discuss, or remap within 30 days?"],
            ],
            [1.55 * inch, 4.65 * inch],
            "TableBodyTight",
        )
    )
    h2(story, "Three-Minute Presentation Frame")
    story.append(
        numbered_list(
            [
                "Name one hard case you handled with more precision than before.",
                "Name the grounder your map leaned on most.",
                "Name one fair criticism you received.",
                "Name one change, non-change, or unresolved question you can defend.",
                "End with one sentence: honesty now asks me to...",
            ]
        )
    )
    story.append(PageBreak())

    section(story, "Facilitation Scripts", "Use these scripts to keep the room disciplined without killing its energy.")
    story.append(
        two_col(
            [
                card(
                    "When students rush",
                    "Slow down. We have not yet answered the written proposition. Before we defend or attack, restate the exact claim.",
                    ACCENT,
                    SOFT,
                ),
                card(
                    "When someone soul-reads",
                    "That may be a category in the tool, but we are not assigning it to a person in this room. What public evidence would support that diagnosis?",
                    BLUE,
                    BLUE_SOFT,
                ),
                card(
                    "When debate turns performative",
                    "The goal is not to win the room. The goal is to make the reasoning inspectable enough that a fair critic could understand it.",
                    GOLD,
                    GOLD_SOFT,
                ),
                card(
                    "When uncertainty appears",
                    "Uncertainty is allowed. Now make it precise: what information, grounder, or principle would move you?",
                    GREEN,
                    GREEN_SOFT,
                ),
                card(
                    "When a student feels exposed",
                    "You may move this answer to private writing. The inquiry continues, but performance is optional.",
                    BLUE,
                    BLUE_SOFT,
                ),
                card(
                    "When a map looks inconsistent",
                    "Good. The tool is doing its job. We now ask whether the difference is principled, accidental, or protective.",
                    ACCENT,
                    SOFT,
                ),
            ]
        )
    )
    story.append(PageBreak())

    section(story, "Troubleshooting", "Dynamic groups need contingencies. Use this page when the room gets stuck.")
    story.append(
        data_table(
            [
                ["Problem", "Likely cause", "Teacher move"],
                ["Students give only slogans", "They are protecting identity or avoiding precision.", "Ask for the exact grounder and what would weaken it."],
                ["One student dominates", "Status competition or anxiety.", "Use silent writing, timed turns, and role rotation."],
                ["Students refuse hard cases", "Fear of conflict or moral contamination.", "Use safety pause, private mapping, and slower case triage."],
                ["Students overuse spiritual rebellion", "They are collapsing disagreement into loyalty.", "Require two non-spiritual explanations before using a spiritual one."],
                ["Students overuse uncertainty", "They may be hiding or genuinely under-informed.", "Ask what information would move the stance and assign research."],
                ["Numbers feel fake", "They are treating sliders as measurement.", "Reframe weights as comparative dependence estimates."],
                ["The group polarizes", "Students are arguing conclusions before mapping reasons.", "Return to stance, grounders, and disagreement diagnosis separately."],
            ],
            [1.35 * inch, 2.15 * inch, 2.7 * inch],
            "TableBodyTight",
        )
    )
    story.append(PageBreak())

    section(story, "Adaptations", "The same core can serve different contexts if the teacher preserves stance, grounders, disagreement, patterns, and revision.")
    story.append(
        data_table(
            [
                ["Context", "Adaptation"],
                ["Youth group", "Use fewer cases, more movement, and stronger safety scripts. Keep private writing central."],
                ["College seminar", "Add readings from moral philosophy, hermeneutics, epistemology, and moral psychology."],
                ["Mixed-belief group", "Let students map from inside or outside Christian commitments; do not require confessional language."],
                ["Homeschool cohort", "Extend assignments into family interviews and comparative tradition research."],
                ["Retreat", "Use Sessions 1, 2, 5, 6, 8, 9, 11, and 12 as an intensive arc."],
                ["Advanced apologetics class", "Pair this curriculum with the Moral System Stress Test and ask whether system-level claims survive case-level mapping."],
            ],
            [1.55 * inch, 4.65 * inch],
            "TableBodyTight",
        )
    )
    story.append(
        callout(
            "Do not adapt away the pressure",
            "The course loses its purpose if students never map concrete cases, never explain disagreement, or never compare patterns across cases.",
            ACCENT,
            SOFT,
        )
    )
    story.append(PageBreak())

    section(story, "Printable One-Page Templates", "These compact prompts can be copied into handouts or slides.")
    story.append(
        data_table(
            [
                ["Template", "Prompts"],
                ["Case map", "Stance. Qualifier. Top three grounders. Top disagreement diagnosis. What would change my answer?"],
                ["Grounder autopsy", "What carries the judgment? What sounds relevant but is weak? What would happen if the lead grounder failed?"],
                ["Disagreement charity", "What is the strongest non-contemptuous reason someone might disagree? What evidence would justify a harsher diagnosis?"],
                ["Pattern drift", "Which two cases are similar? Where did my reasoning change? Is the change principled?"],
                ["Revision log", "Original input. Criticism received. Revision made or refused. Reason."],
                ["Final reflection", "My map revealed. My strongest grounder was. I revised. I still wonder. Honesty now asks me to."],
            ],
            [1.45 * inch, 4.75 * inch],
            "TableBodyTight",
        )
    )
    story.append(PageBreak())

    section(story, "Closing Counsel for the Teacher", "The best version of this course is rigorous and humane at the same time.")
    story.append(
        bullet_list(
            [
                "Do not rush to resolution. Young seekers often need permission to see complexity before they can responsibly own conviction.",
                "Do not make neutrality the hidden virtue. A student may become more confident after inspection, and that can be genuine growth.",
                "Do not make certainty the hidden virtue. A student may become less confident after inspection, and that can also be genuine growth.",
                "Keep returning to the map: stance, grounders, disagreement, patterns, critique, revision.",
                "End with agency. The student owns the next inquiry step.",
            ],
            "BodyX",
        )
    )
    story.append(
        callout(
            "Final line",
            "A sincere seeker does not need a classroom that flatters certainty or flatters doubt. A sincere seeker needs a disciplined space where moral judgment can become visible, answerable, and more honest.",
            GREEN,
            GREEN_SOFT,
        )
    )

    return story


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=letter,
        leftMargin=0.62 * inch,
        rightMargin=0.62 * inch,
        topMargin=0.68 * inch,
        bottomMargin=0.68 * inch,
        title="Moral Particulars Audit Curriculum",
        author="Phil Stilwell",
        subject="A 12-session curriculum for teaching the Moral Particulars Audit tool",
    )
    doc.build(build_story(), onFirstPage=cover, onLaterPages=on_page)
    print(OUTPUT)


if __name__ == "__main__":
    main()

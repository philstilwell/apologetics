#!/usr/bin/env python3
"""Generate the Resurrection Evidence Audit small-group curriculum PDF."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
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
OUTPUT = ROOT / "assets" / "manuals" / "resurrection-evidence-audit-curriculum.pdf"

FOREST = colors.HexColor("#103d26")
LEAF = colors.HexColor("#1f6b3d")
BRIGHT = colors.HexColor("#06da49")
BROWN = colors.HexColor("#8f5422")
CLAY = colors.HexColor("#97544d")
CREAM = colors.HexColor("#fbfff7")
PALE_GREEN = colors.HexColor("#e8f3e8")
PALE_GOLD = colors.HexColor("#f2f5de")
PALE_CLAY = colors.HexColor("#f5ebe8")
INK = colors.HexColor("#102017")
MUTED = colors.HexColor("#435244")
SILVER = colors.HexColor("#ccd6cf")
BLACK = colors.HexColor("#050806")


def build_styles():
    base = getSampleStyleSheet()
    return {
        "Title": ParagraphStyle(
            "CurriculumTitle",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=29,
            leading=32,
            textColor=FOREST,
            alignment=TA_CENTER,
            spaceAfter=8,
        ),
        "Subtitle": ParagraphStyle(
            "CurriculumSubtitle",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=12.5,
            leading=17,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=18,
        ),
        "H1": ParagraphStyle(
            "H1",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=19,
            leading=22,
            textColor=FOREST,
            spaceBefore=12,
            spaceAfter=7,
            keepWithNext=True,
        ),
        "H2": ParagraphStyle(
            "H2",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=12.2,
            leading=15,
            textColor=BROWN,
            spaceBefore=8,
            spaceAfter=4,
            keepWithNext=True,
        ),
        "Body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9.2,
            leading=12.7,
            textColor=INK,
            spaceAfter=5.5,
        ),
        "Small": ParagraphStyle(
            "Small",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=7.8,
            leading=10.2,
            textColor=MUTED,
            spaceAfter=3,
        ),
        "Quote": ParagraphStyle(
            "Quote",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=16,
            textColor=FOREST,
            alignment=TA_CENTER,
            spaceBefore=7,
            spaceAfter=7,
        ),
        "Tag": ParagraphStyle(
            "Tag",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=7.7,
            leading=9.5,
            textColor=FOREST,
            alignment=TA_CENTER,
        ),
        "CellTitle": ParagraphStyle(
            "CellTitle",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=8.5,
            leading=10.5,
            textColor=FOREST,
        ),
        "Cell": ParagraphStyle(
            "Cell",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=7.65,
            leading=9.6,
            textColor=INK,
        ),
        "CellSmall": ParagraphStyle(
            "CellSmall",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=7.1,
            leading=9,
            textColor=INK,
        ),
    }


class CoverMark(Flowable):
    def __init__(self, width=1.55 * inch, height=1.55 * inch):
        super().__init__()
        self.width = width
        self.height = height

    def draw(self):
        canvas = self.canv
        cx = self.width / 2
        cy = self.height / 2
        radius = min(self.width, self.height) * 0.38
        canvas.setFillColor(FOREST)
        canvas.circle(cx, cy, radius, stroke=0, fill=1)
        canvas.setStrokeColor(BROWN)
        canvas.setLineWidth(2)
        canvas.line(cx, cy - radius * 1.35, cx, cy + radius * 1.35)
        canvas.line(cx - radius * 1.35, cy, cx + radius * 1.35, cy)
        canvas.setFillColor(colors.white)
        canvas.setFont("Helvetica-Bold", 23)
        canvas.drawCentredString(cx, cy - 8, "X")


def p(text, style):
    return Paragraph(text, style)


def bullets(items, styles):
    return ListFlowable(
        [ListItem(p(item, styles["Body"]), leftIndent=12) for item in items],
        bulletType="bullet",
        start="circle",
        leftIndent=15,
        bulletFontName="Helvetica-Bold",
        bulletColor=LEAF,
        bulletFontSize=7,
    )


def numbers(items, styles):
    return ListFlowable(
        [ListItem(p(item, styles["Body"]), leftIndent=13) for item in items],
        bulletType="1",
        leftIndent=18,
        bulletFontName="Helvetica-Bold",
        bulletColor=BROWN,
        bulletFontSize=8,
    )


def callout(title, body, styles, fill=PALE_GREEN, border=LEAF):
    table = Table([[p(title, styles["CellTitle"])], [p(body, styles["Cell"])]], colWidths=[6.8 * inch])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), fill),
                ("BOX", (0, 0), (-1, -1), 0.8, border),
                ("LEFTPADDING", (0, 0), (-1, -1), 9),
                ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return KeepTogether([table, Spacer(1, 7)])


def two_col(rows, styles, widths=(2.05 * inch, 4.6 * inch), small=False):
    body_style = styles["CellSmall"] if small else styles["Cell"]
    table = Table(
        [[p(left, styles["CellTitle"]), p(right, body_style)] for left, right in rows],
        colWidths=list(widths),
        hAlign="LEFT",
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ("BOX", (0, 0), (-1, -1), 0.55, SILVER),
                ("INNERGRID", (0, 0), (-1, -1), 0.3, SILVER),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5.5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5.5),
            ]
        )
    )
    return KeepTogether([table, Spacer(1, 8)])


def three_col(rows, styles, widths=(1.15 * inch, 2.25 * inch, 3.25 * inch)):
    table = Table(
        [[p(a, styles["CellTitle"]), p(b, styles["Cell"]), p(c, styles["Cell"])] for a, b, c in rows],
        colWidths=list(widths),
        hAlign="LEFT",
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ("BOX", (0, 0), (-1, -1), 0.55, SILVER),
                ("INNERGRID", (0, 0), (-1, -1), 0.3, SILVER),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5.5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5.5),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return KeepTogether([table, Spacer(1, 8)])


def minute_plan(rows, styles):
    table = Table(
        [[p(time, styles["CellTitle"]), p(action, styles["Cell"])] for time, action in rows],
        colWidths=[0.78 * inch, 5.85 * inch],
        hAlign="LEFT",
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ("BOX", (0, 0), (-1, -1), 0.55, SILVER),
                ("INNERGRID", (0, 0), (-1, -1), 0.3, SILVER),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5.5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5.5),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return KeepTogether([table, Spacer(1, 8)])


def blank_lines(count=6):
    return Spacer(1, count * 0.18 * inch)


def header_footer(canvas, doc):
    canvas.saveState()
    width, height = letter
    canvas.setStrokeColor(PALE_GREEN)
    canvas.setLineWidth(0.8)
    canvas.line(doc.leftMargin, height - 0.55 * inch, width - doc.rightMargin, height - 0.55 * inch)
    canvas.setFont("Helvetica-Bold", 8)
    canvas.setFillColor(FOREST)
    canvas.drawString(doc.leftMargin, height - 0.42 * inch, "Crosshairs Audit Lab")
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(width - doc.rightMargin, height - 0.42 * inch, "Resurrection Evidence Audit Curriculum")
    canvas.setStrokeColor(PALE_GREEN)
    canvas.line(doc.leftMargin, 0.55 * inch, width - doc.rightMargin, 0.55 * inch)
    canvas.setFont("Helvetica", 7.3)
    canvas.setFillColor(MUTED)
    canvas.drawString(doc.leftMargin, 0.37 * inch, "Small-group curriculum for honest evidence, alternatives, and proportioned confidence.")
    canvas.drawRightString(width - doc.rightMargin, 0.37 * inch, f"Page {doc.page}")
    canvas.restoreState()


def cover(styles):
    mark_table = Table([[CoverMark()]], colWidths=[6.8 * inch], rowHeights=[1.75 * inch])
    mark_table.setStyle(TableStyle([("ALIGN", (0, 0), (-1, -1), "CENTER")]))
    tags = Table(
        [[p("Curriculum", styles["Tag"]), p("Small group", styles["Tag"]), p("8 sessions", styles["Tag"]), p("Teacher guide", styles["Tag"])]],
        colWidths=[1.15 * inch, 1.25 * inch, 1.15 * inch, 1.35 * inch],
        hAlign="CENTER",
    )
    tags.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALE_GREEN),
                ("BOX", (0, 0), (-1, -1), 0.6, LEAF),
                ("INNERGRID", (0, 0), (-1, -1), 0.35, LEAF),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return [
        Spacer(1, 0.2 * inch),
        mark_table,
        p("Before Confidence", styles["Title"]),
        p(
            "A full small-group curriculum for teaching evidence, alternatives, unknowns, and honest resurrection inquiry.",
            styles["Subtitle"],
        ),
        tags,
        Spacer(1, 0.28 * inch),
        callout(
            "Course thesis",
            "Young seekers need more than arguments. They need disciplined habits for asking what a claim means, what evidence would be required, what alternatives remain live, and how much confidence the evidence can responsibly carry.",
            styles,
            fill=CREAM,
            border=LEAF,
        ),
        p(
            "This curriculum is designed for a dynamic teacher leading a small group of young, honest seekers. It uses the Resurrection Evidence Audit as the central lab instrument, but its deeper purpose is intellectual formation: precision, proportion, comparison, humility, and integrity.",
            styles["Body"],
        ),
        Spacer(1, 0.3 * inch),
        p("https://xhairs.com/apps/resurrection-evidence-audit/", styles["Quote"]),
        PageBreak(),
    ]


def orientation(styles):
    rows = [
        ("Audience", "A small group of young seekers who are willing to examine Christian resurrection claims without cynicism, defensiveness, or inherited certainty."),
        ("Teacher posture", "Warm, exacting, creative, and emotionally aware. The teacher should make hard reasoning feel safe without making weak reasoning feel safe."),
        ("Course length", "Eight 90-minute sessions, with optional extension labs and a final audit presentation."),
        ("Primary tool", "Resurrection Evidence Audit, especially the teaching parallel, evidence contribution map, credence donut, audit pressure, and report."),
        ("Core result", "Students can state a claim, assign a starting probability, compare explanations, weigh evidence, preserve unknowns, and explain their confidence."),
    ]
    outcomes = [
        "State resurrection and miracle claims precisely enough that they can be evaluated.",
        "Explain why possibility, sincerity, and emotional force are not the same as probability.",
        "Use starting probabilities honestly instead of hiding them behind religious or skeptical slogans.",
        "Compare the selected claim with known material alternatives and unconceived explanations.",
        "Identify which evidence items are actually doing the work in the result.",
        "Distinguish evidence that people believed something from evidence that what they believed was true.",
        "Reduce evidence weights when testimony, memory, texts, or communities are not independent.",
        "Treat negative evidence as real evidence rather than as an inconvenience.",
        "Use the app report and AI prompt as tools for critique, not as substitutes for judgment.",
    ]
    return [
        p("Curriculum Overview", styles["H1"]),
        two_col(rows, styles),
        p("By the end, students should be able to say:", styles["Body"]),
        p(
            "I can state the claim precisely, assign a starting probability, compare live explanations, weigh evidence honestly, preserve room for unknowns, and explain why my confidence should rise, fall, or remain uncertain.",
            styles["Quote"],
        ),
        p("Core learning outcomes", styles["H2"]),
        bullets(outcomes, styles),
        PageBreak(),
    ]


def course_map(styles):
    rows = [
        ("1", "Honest inquiry", "What does it mean to seek truth rather than protect identity?", "Sincerity is not accuracy; possibility is not probability."),
        ("2", "Claim precision", "What exactly is being claimed?", "A moving claim cannot be evaluated honestly."),
        ("3", "Starting probability", "Why must we name a prior?", "Refusing to estimate hides a probability judgment."),
        ("4", "Teaching parallel", "How do we reason when the supernatural claim is not ours?", "Use the same standard on cherished and non-cherished claims."),
        ("5", "Evidence contribution", "What is actually doing the work?", "Evidence must be assessed by movement, independence, and direction."),
        ("6", "Alternatives and unknowns", "What else could explain the data?", "Known alternatives and unknown reserve prevent premature closure."),
        ("7", "Reading the result", "What should we do when the result is uncomfortable?", "Audit pressure is a warning, not an insult."),
        ("8", "Report and virtue", "How do we carry uncertainty honestly?", "The goal is proportioned confidence and intellectual courage."),
    ]
    table = Table(
        [[p("Session", styles["CellTitle"]), p("Focus", styles["CellTitle"]), p("Core question", styles["CellTitle"]), p("Central insight", styles["CellTitle"])]]
        + [[p(a, styles["Cell"]), p(b, styles["Cell"]), p(c, styles["Cell"]), p(d, styles["Cell"])] for a, b, c, d in rows],
        colWidths=[0.55 * inch, 1.25 * inch, 2.35 * inch, 2.65 * inch],
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), PALE_GREEN),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("BOX", (0, 0), (-1, -1), 0.6, SILVER),
                ("INNERGRID", (0, 0), (-1, -1), 0.3, SILVER),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return [
        p("Course Architecture", styles["H1"]),
        p(
            "Each session follows the same rhythm: opening provocation, concept teaching, concrete analogy, tool lab, group discussion, reflection journal, and take-home challenge. The repetition matters. Students are learning a habit of inquiry, not merely a set of ideas.",
            styles["Body"],
        ),
        table,
        Spacer(1, 8),
        callout(
            "Teacher mantra",
            "We are not here to win. We are here to see.",
            styles,
            fill=PALE_GOLD,
            border=BROWN,
        ),
        PageBreak(),
    ]


SESSION_DATA = [
    {
        "title": "Session 1 - What Honest Inquiry Requires",
        "question": "What does it mean to seek truth rather than protect identity?",
        "objectives": [
            "Distinguish sincerity from accuracy.",
            "Distinguish possible, plausible, probable, and well-supported.",
            "Name why emotionally important beliefs need more clarity, not less.",
        ],
        "minutes": [
            ("0-10", "Opening provocation: rank claims by required evidence."),
            ("10-25", "Teach possibility, plausibility, probability, and support."),
            ("25-45", "Activity: evidence requirement ladder."),
            ("45-65", "Introduce the app as a lab instrument, not a verdict machine."),
            ("65-80", "Small-group discussion: where do we feel defensive?"),
            ("80-90", "Journal and exit ticket."),
        ],
        "tool": "Show the top of the Resurrection Evidence Audit without running the resurrection preset. Point out selected claim, starting point, evidence, alternatives, result, report.",
        "activity": "Students compare four claims: a friend is trustworthy, a stranger won the lottery twice, a demon caused a car crash, and Jesus bodily rose from the dead. They explain what kind of evidence each would require.",
        "teacher": "Use humor and speed in the opening, then slow down when discomfort appears. Name discomfort as data, not danger.",
        "takehome": "Write one belief you care about and list what evidence would count for it, against it, and as unclear.",
        "assessment": "Students can explain why 'possible' is weaker than 'probable' without sounding dismissive.",
    },
    {
        "title": "Session 2 - State the Claim Precisely",
        "question": "What exactly are we asking the evidence to support?",
        "objectives": [
            "Identify claim inflation and moving targets.",
            "Separate minimal historical claims from theological conclusions.",
            "Rewrite vague religious claims into auditable propositions.",
        ],
        "minutes": [
            ("0-10", "Warm-up: 'Jesus rose' can mean how many things?"),
            ("10-30", "Teach the ladder of claims."),
            ("30-55", "Claim surgery workshop."),
            ("55-70", "Tool lab: Step 1, claim preset and selected claim display."),
            ("70-85", "Pair critique: make your partner's claim more precise."),
            ("85-90", "Exit ticket."),
        ],
        "tool": "Open Step 1. Compare the resurrection preset, answered prayer, and teaching parallel. Ask what each exact selected claim commits the user to.",
        "activity": "Students rewrite 'Christianity is true,' 'the disciples saw Jesus,' and 'God raised Jesus' into narrower and broader versions.",
        "teacher": "Do not let the class drift into theology too early. Keep asking: which exact sentence is on trial?",
        "takehome": "Create a claim ladder with at least six rungs from thin historical claim to thick Christian conclusion.",
        "assessment": "Students can explain why evidence for one rung does not automatically prove every higher rung.",
    },
    {
        "title": "Session 3 - The Starting Point Problem",
        "question": "Why must we assign a starting probability?",
        "objectives": [
            "Explain a prior in plain English.",
            "Recognize hidden priors in apologetic and skeptical rhetoric.",
            "Distinguish 'God can do X' from 'X is likely in this case.'",
        ],
        "minutes": [
            ("0-10", "Opening: choose a rough baseline for ordinary and extraordinary claims."),
            ("10-30", "Teach starting confidence and burden of specificity."),
            ("30-50", "Probability confession exercise."),
            ("50-70", "Tool lab: Step 2 starting point."),
            ("70-82", "Discuss why numbers feel threatening."),
            ("82-90", "Journal: what prior was I hiding?"),
        ],
        "tool": "Use Step 2 and the top summary row. Move baseline confidence and watch how much evidence lift is needed for high confidence.",
        "activity": "Students assign rough baselines to fainting, legend, sincere misinterpretation, and bodily resurrection by divine action.",
        "teacher": "Keep the numbers rough. The point is transparency, not fake precision.",
        "takehome": "Find three phrases that hide probability: 'it could happen,' 'God can do anything,' 'science cannot explain it,' or similar.",
        "assessment": "Students can say why refusing a prior hides rather than removes probability.",
    },
    {
        "title": "Session 4 - The Teaching Parallel",
        "question": "How do we reason when the supernatural claim is not ours?",
        "objectives": [
            "Use the demon-caused car crash scenario to lower defensiveness.",
            "Compare supernatural and ordinary explanations in the same frame.",
            "Notice when 'no obvious cause' becomes an illicit shortcut.",
        ],
        "minutes": [
            ("0-8", "Story hook: the car crash and the pulled wheel."),
            ("8-25", "Teach why analogies help us see standards."),
            ("25-60", "Tool lab: run the teaching parallel completely."),
            ("60-75", "Alternative storm: what else could explain the crash?"),
            ("75-85", "Compare emotional force and evidential force."),
            ("85-90", "Exit ticket."),
        ],
        "tool": "Load Teaching parallel: demon turned the wheel. Run all steps. Emphasize ordinary alternatives and unknown reserve.",
        "activity": "Students argue for the demon claim for three minutes, then argue against it for three minutes using the same evidence.",
        "teacher": "Be theatrical in the scenario but disciplined in the analysis. The point is not to mock demons. The point is to compare explanations.",
        "takehome": "Write a paragraph: which move in the demon case would feel unfair if used in the resurrection case?",
        "assessment": "Students can explain why a dramatic report does not automatically defeat ordinary alternatives.",
    },
    {
        "title": "Session 5 - Evidence That Moves the Result",
        "question": "What is actually doing the work?",
        "objectives": [
            "Read the evidence contribution map.",
            "Separate impressive evidence from evidence that strongly changes probability.",
            "Identify positive, near-neutral, and negative contributions.",
        ],
        "minutes": [
            ("0-10", "Opening: what evidence sounds strongest before calculation?"),
            ("10-25", "Teach movement, direction, and contribution share."),
            ("25-55", "Tool lab: evidence sliders and contribution map."),
            ("55-72", "Independence map exercise."),
            ("72-84", "Discuss delayed records and external silence as negative evidence."),
            ("84-90", "Exit ticket."),
        ],
        "tool": "Use Step 3 and the Evidence Contribution Map. Move an evidence item from weak to strong, then lower its independence weight.",
        "activity": "Students sort evidence into supports strongly, supports weakly, neutral, counts against, unclear.",
        "teacher": "Ask repeatedly: is this evidence for belief, or evidence for the belief being accurate?",
        "takehome": "Choose one resurrection evidence item and write what it would look like if the claim were true and if the claim were false.",
        "assessment": "Students can name the item carrying the most result movement and explain why that matters.",
    },
    {
        "title": "Session 6 - Alternatives and Unknowns",
        "question": "What else could explain the data?",
        "objectives": [
            "Name known material alternatives fairly.",
            "Explain unknown reserve as epistemic humility.",
            "Avoid forcing all unexplained probability into the preferred claim.",
        ],
        "minutes": [
            ("0-10", "Opening: the explanation you forgot."),
            ("10-30", "Teach alternatives, unknowns, and premature closure."),
            ("30-55", "Tool lab: Step 4 alternatives and unknown reserve."),
            ("55-70", "Alternative storm for resurrection claims."),
            ("70-82", "Unknown reserve reflection."),
            ("82-90", "Group debrief."),
        ],
        "tool": "Move known alternatives from set aside to strong. Move unknown reserve and watch cause credence change without treating unknown as a theory.",
        "activity": "Students generate ordinary explanations: grief-shaped experience, visionary experience, story development, source dependence, theological shaping, memory distortion, social reinforcement.",
        "teacher": "Protect students from cynicism and from premature closure. Unknown reserve is humility, not a trick.",
        "takehome": "List three explanations you had not considered before this session and why each deserves at least some room.",
        "assessment": "Students can distinguish an unknown reserve from a named alternative explanation.",
    },
    {
        "title": "Session 7 - Reading the Result Without Flinching",
        "question": "What should we do when the result is uncomfortable?",
        "objectives": [
            "Read revised confidence, audit pressure, cause credence, and repair moves.",
            "Compare believer-friendly, seeker, and stricter settings.",
            "Treat a low result as information rather than personal attack.",
        ],
        "minutes": [
            ("0-10", "Opening: what result would you secretly prefer?"),
            ("10-25", "Teach result interpretation and audit pressure."),
            ("25-60", "Tool lab: compare all three settings profiles."),
            ("60-75", "One assumption challenge."),
            ("75-85", "Discuss repair moves."),
            ("85-90", "Journal."),
        ],
        "tool": "Run believer-friendly settings, seeker settings, and stricter settings. Record what changes and which assumptions control the movement.",
        "activity": "Students identify the one assumption that most changes the outcome: prior, independence, alternatives, unknown reserve, or evidence likelihood.",
        "teacher": "Do not let students use a setting profile as a team jersey. Profiles are stress tests.",
        "takehome": "Write a result interpretation that begins: 'If these assumptions are accepted, then...'",
        "assessment": "Students can explain why audit pressure is a warning score, not an accusation.",
    },
    {
        "title": "Session 8 - Report, AI Critique, and Intellectual Virtue",
        "question": "How do we carry uncertainty honestly?",
        "objectives": [
            "Use the generated report as an assumption ledger.",
            "Use the AI prompt as a critique tool without outsourcing judgment.",
            "Present a final audit summary with courage and proportion.",
        ],
        "minutes": [
            ("0-10", "Opening: what would change your mind?"),
            ("10-25", "Teach reportability and intellectual virtues."),
            ("25-45", "Tool lab: generate report and AI prompt."),
            ("45-75", "Final audit presentations."),
            ("75-85", "Group reflection: what did honesty cost?"),
            ("85-90", "Closing charge."),
        ],
        "tool": "Use Step 6 report and AI prompt. Ask how a critic might challenge the user's priors, evidence weights, independence assumptions, alternatives, and unknown reserve.",
        "activity": "Each student presents exact claim, starting probability, strongest evidence, strongest alternative, unknown reserve, current confidence, and what would change the result.",
        "teacher": "Honor courage, not certainty. The best presentations may end in 'I do not yet know.'",
        "takehome": "Write a one-page reflection on how your standards changed during the course.",
        "assessment": "Students can present a proportioned confidence judgment without hiding uncertainty.",
    },
]


def session_page(session, styles):
    flow = [p(session["title"], styles["H1"])]
    flow.append(callout("Core question", session["question"], styles, fill=CREAM, border=BROWN))
    flow.append(p("Learning objectives", styles["H2"]))
    flow.append(bullets(session["objectives"], styles))
    flow.append(p("90-minute plan", styles["H2"]))
    flow.append(minute_plan(session["minutes"], styles))
    flow.append(p("Teacher moves and lab work", styles["H2"]))
    flow.append(
        two_col(
            [
                ("Tool lab", session["tool"]),
                ("Signature activity", session["activity"]),
                ("Teacher move", session["teacher"]),
                ("Take-home challenge", session["takehome"]),
                ("Checkpoint", session["assessment"]),
            ],
            styles,
            small=True,
        )
    )
    flow.append(PageBreak())
    return flow


def mini_modules(styles):
    modules = [
        ("Possibility is cheap", "Could have happened opens the door; probability decides how far the door should open. Students practice replacing 'possible' language with graded confidence language."),
        ("The ladder of claims", "Something happened, people had experiences, they interpreted those experiences religiously, the interpretation was sincere, the interpretation was accurate, the event was supernatural, the cause was the Christian God, and the larger system follows. Each rung needs support."),
        ("Independence is not repetition", "Four reports are not four independent reports if they share sources, communities, memories, texts, or theology. Repetition can amplify a common source instead of adding fresh evidence."),
        ("Sincerity and costly commitment", "Sincerity can show that people believed something. Costly commitment can show depth of conviction. Neither automatically shows that the belief was accurate."),
        ("Negative evidence is evidence", "Record latency, external silence, source dependence, discrepancies, ordinary psychology, cultural expectation, and theological shaping should be counted rather than hidden."),
        ("Unknown reserve and humility", "Unknown reserve says the current list of explanations may be incomplete. It is not a new theory; it is a restraint against pretending that the options are exhausted."),
    ]
    return [
        p("Reusable Mini-Lessons", styles["H1"]),
        p(
            "These modules can be inserted wherever the group needs more practice. They also work as make-up lessons for absent students.",
            styles["Body"],
        ),
        two_col(modules, styles),
        PageBreak(),
    ]


def activities_bank(styles):
    rows = [
        ("Claim surgery", "Students turn vague claims into precise, auditable claims. Rule: no claim may contain a word that can quietly expand during debate."),
        ("Probability confession", "Students name the probability they were already assuming before the app asked for one. The teacher normalizes discomfort without letting students hide."),
        ("Alternative storm", "For three minutes the group lists ordinary alternatives before anyone defends the supernatural claim."),
        ("Evidence sorting", "Students sort each evidence item into strongly supports, weakly supports, neutral, counts against, or unclear."),
        ("Independence map", "Students draw lines between evidence items that may share source streams, memories, communities, or retellings."),
        ("One assumption challenge", "Students change exactly one setting and record how much the final result moves."),
        ("Steelman swap", "Pairs defend the strongest version of the view they do not prefer, then report what they learned."),
        ("Report defense", "Students explain their generated report to a friendly critic who asks only clarification questions for five minutes."),
    ]
    return [
        p("Activity Bank", styles["H1"]),
        two_col(rows, styles),
        callout(
            "Facilitation rule",
            "Every activity should end with the same question: what changed in your confidence, and why?",
            styles,
            fill=PALE_GOLD,
            border=BROWN,
        ),
        PageBreak(),
    ]


def worksheets(styles):
    flow = [p("Student Workbook Pages", styles["H1"])]
    flow.append(p("Worksheet 1 - Claim Surgery", styles["H2"]))
    flow.append(two_col([
        ("Vague claim", "Write the broad claim as you first heard it."),
        ("Precise claim", "Rewrite it as one clear sentence that could be tested."),
        ("Thinner version", "What weaker claim might the evidence actually support?"),
        ("Stronger version", "What stronger claim is sometimes smuggled in?"),
    ], styles))
    flow.append(blank_lines(5))
    flow.append(p("Worksheet 2 - Probability Confession", styles["H2"]))
    flow.append(two_col([
        ("Before evidence", "What starting confidence was I tempted to assume?"),
        ("Why that number", "What background beliefs, emotions, or standards pushed me there?"),
        ("Fair challenge", "What would a sincere critic say about my starting point?"),
    ], styles))
    flow.append(blank_lines(5))
    flow.append(PageBreak())
    flow.append(p("Worksheet 3 - Evidence Ledger", styles["H2"]))
    flow.append(three_col([
        ("Evidence item", "Direction", "Why it should move confidence up, down, or not much"),
        ("", "", ""),
        ("", "", ""),
        ("", "", ""),
        ("", "", ""),
        ("", "", ""),
    ], styles, widths=(1.7 * inch, 1.2 * inch, 3.8 * inch)))
    flow.append(p("Worksheet 4 - Alternatives and Unknowns", styles["H2"]))
    flow.append(two_col([
        ("Known alternatives", "List ordinary explanations that could account for some or all of the data."),
        ("Best alternative", "Which alternative deserves the most weight right now?"),
        ("Unknown reserve", "What kind of missing information could matter?"),
        ("Humility statement", "Write one sentence that admits what you do not know."),
    ], styles))
    flow.append(blank_lines(5))
    flow.append(PageBreak())
    flow.append(p("Worksheet 5 - Final Audit Presentation", styles["H2"]))
    flow.append(two_col([
        ("Exact claim", ""),
        ("Starting probability", ""),
        ("Strongest positive evidence", ""),
        ("Strongest negative evidence", ""),
        ("Strongest alternative", ""),
        ("Unknown reserve", ""),
        ("Current confidence", ""),
        ("What would change my mind", ""),
    ], styles))
    flow.append(PageBreak())
    return flow


def assessment_and_covenant(styles):
    rubric = [
        ("Claim precision", "Names the exact claim and avoids sliding between weaker and stronger claims."),
        ("Probability honesty", "States a rough prior and can explain why it was chosen."),
        ("Evidence discipline", "Separates evidential movement from emotional impressiveness."),
        ("Alternative fairness", "Names serious alternatives without caricature."),
        ("Unknown humility", "Uses unknown reserve as restraint, not as evasion."),
        ("Interpretive courage", "Can accept an uncomfortable result without panic or spin."),
        ("Reportability", "Settings and conclusions can be inspected by another careful person."),
    ]
    norms = [
        "We will not mock belief.",
        "We will not protect belief from fair questions.",
        "We will distinguish people from arguments.",
        "We will not pretend certainty we do not have.",
        "We will not punish honest uncertainty.",
        "We will use the same standards across claims.",
        "We will treat discomfort as information, not danger.",
    ]
    return [
        p("Assessment and Group Covenant", styles["H1"]),
        p("Final audit presentation rubric", styles["H2"]),
        two_col(rubric, styles),
        p("Discussion covenant", styles["H2"]),
        bullets(norms, styles),
        callout(
            "Teacher's closing standard",
            "The highest achievement is not forced belief or forced disbelief. It is being able to say exactly what the evidence currently justifies and what remains uncertain.",
            styles,
            fill=CREAM,
            border=CLAY,
        ),
        PageBreak(),
    ]


def teacher_notes(styles):
    return [
        p("Teacher Notes for a Dynamic Facilitator", styles["H1"]),
        two_col(
            [
                ("Energy", "Use vivid stories, movement, whiteboards, role play, quick polls, and paired challenges. Keep the room alive without letting the reasoning become loose."),
                ("Emotional pacing", "Pause when students show defensiveness. Ask what feels threatened. Then return gently to the claim, the evidence, and the alternatives."),
                ("Precision refrain", "When discussion blurs, ask: which exact claim is on the table? What would we expect if it were true? What would we expect if it were false?"),
                ("Creative tension", "Let students feel the pull of both sides. A good class should make simplistic belief and simplistic dismissal both feel less satisfying."),
                ("Use of humor", "Humor should lower fear, not belittle anyone. Laugh at sloppy reasoning patterns, not at people."),
                ("Handling certainty", "When a student is certain, ask what evidence could lower confidence. When a student is dismissive, ask what evidence could raise confidence."),
                ("Handling silence", "Do not rush silence after hard questions. Silence often means the class is doing real work."),
            ],
            styles,
        ),
        p("The deep structure", styles["H2"]),
        two_col(
            [
                ("Precision", "What exactly is being claimed?"),
                ("Proportion", "How much confidence does the evidence justify?"),
                ("Comparison", "What explains the evidence best?"),
                ("Humility", "What might I be missing?"),
                ("Integrity", "Would I use the same standard if the claim were not mine?"),
            ],
            styles,
        ),
        PageBreak(),
    ]


def final_page(styles):
    return [
        p("Final Charge", styles["H1"]),
        p(
            "This curriculum is not designed to make young seekers suspicious of everything. It is designed to help them become the kind of people who can love truth more than comfort, clarity more than slogans, and proportion more than pressure.",
            styles["Body"],
        ),
        p(
            "The Resurrection Evidence Audit is the lab instrument. The curriculum is the apprenticeship. Students practice the same discipline again and again until it becomes natural: state the claim, name the starting point, compare explanations, weigh evidence, reserve humility, and report the result without flinching.",
            styles["Body"],
        ),
        p("We are not here to win. We are here to see.", styles["Quote"]),
    ]


def build_story(styles):
    story = []
    story.extend(cover(styles))
    story.extend(orientation(styles))
    story.extend(course_map(styles))
    for session in SESSION_DATA:
        story.extend(session_page(session, styles))
    story.extend(mini_modules(styles))
    story.extend(activities_bank(styles))
    story.extend(worksheets(styles))
    story.extend(assessment_and_covenant(styles))
    story.extend(teacher_notes(styles))
    story.extend(final_page(styles))
    return story


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    styles = build_styles()
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=letter,
        rightMargin=0.6 * inch,
        leftMargin=0.6 * inch,
        topMargin=0.72 * inch,
        bottomMargin=0.72 * inch,
        title="Before Confidence: Resurrection Evidence Audit Curriculum",
        author="Crosshairs Audit Lab",
        subject="Small-group curriculum for teaching the Resurrection Evidence Audit",
    )
    doc.build(build_story(styles), onFirstPage=header_footer, onLaterPages=header_footer)
    print(OUTPUT)


if __name__ == "__main__":
    main()

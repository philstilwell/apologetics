import shutil
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[3]
APP_DIR = ROOT / "apps" / "fine-tuning-bridge-audit"
OUTPUT_DIR = ROOT / "output" / "pdf"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_PDF = OUTPUT_DIR / "fine-tuning-bridge-audit-curriculum.pdf"
PUBLISHED_DIR = ROOT / "assets" / "curricula"
PUBLISHED_DIR.mkdir(parents=True, exist_ok=True)
PUBLISHED_PDF = PUBLISHED_DIR / "fine-tuning-bridge-audit-curriculum.pdf"
BEACH_IMAGE = APP_DIR / "fine-tuning-beach.png"


INK = colors.HexColor("#16241d")
MUTED = colors.HexColor("#4d6258")
TEAL = colors.HexColor("#234637")
TEAL_SOFT = colors.HexColor("#dce8dd")
SAND = colors.HexColor("#fff6d7")
SAND_SOFT = colors.HexColor("#fbf9ef")
COPPER = colors.HexColor("#9c7a2a")
GOLD = colors.HexColor("#c7a13a")
LINE = colors.HexColor("#a8c4af")
ALERT = colors.HexColor("#fff0b8")


styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="CurriculumTitle",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=27,
        leading=31,
        textColor=INK,
        alignment=TA_CENTER,
        spaceAfter=10,
    )
)
styles.add(
    ParagraphStyle(
        name="CurriculumSubtitle",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=11.5,
        leading=16,
        textColor=MUTED,
        alignment=TA_CENTER,
        spaceAfter=14,
    )
)
styles.add(
    ParagraphStyle(
        name="Kicker",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=9,
        leading=11,
        textColor=COPPER,
        alignment=TA_LEFT,
        spaceAfter=4,
    )
)
styles.add(
    ParagraphStyle(
        name="SectionTitle",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=18,
        leading=22,
        textColor=INK,
        spaceAfter=8,
        spaceBefore=4,
    )
)
styles.add(
    ParagraphStyle(
        name="SubTitle",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=12.5,
        leading=15,
        textColor=TEAL,
        spaceBefore=6,
        spaceAfter=4,
    )
)
styles.add(
    ParagraphStyle(
        name="Body",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=10.4,
        leading=14.2,
        textColor=MUTED,
        spaceAfter=8,
    )
)
styles.add(
    ParagraphStyle(
        name="BodyTight",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9.6,
        leading=12.6,
        textColor=MUTED,
        spaceAfter=5,
    )
)
styles.add(
    ParagraphStyle(
        name="CurriculumBullet",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9.9,
        leading=13.1,
        textColor=MUTED,
        leftIndent=14,
        firstLineIndent=-10,
        spaceAfter=4,
    )
)
styles.add(
    ParagraphStyle(
        name="SmallNote",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=8.8,
        leading=11.4,
        textColor=MUTED,
        spaceAfter=4,
    )
)


COURSE_OUTCOMES = [
    "Distinguish design only, life purpose, human purpose, and Christian purpose without letting thicker claims borrow thinner support.",
    "Explain the eight bridges in plain language and identify what counts as missing, asserted, or substantiated.",
    "Use the beach analogy to distinguish life-permitting, life-abundant, and human-centered expectations.",
    "Name prior pressure, world-shape tension, and human-target pressure without treating the tool as a verdict machine.",
    "Give one honest final sentence that states the current ceiling of a fine-tuning argument and the strongest live competitor.",
]

COURSE_NORMS = [
    "Reward honesty more than confidence.",
    "Treat a lowered ceiling as progress, not defeat.",
    "Always ask what is actually doing the work.",
    "Keep rival explanations visible long enough to receive a fair hearing.",
    "Use plain speech before abstract vocabulary.",
    "Protect the room for sincere believers, skeptics, and mixed cases alike.",
]

ASSESSMENT_PILLARS = [
    "Conceptual clarity: the student can name the claim level, the bridge, and the pressure point without muddling them together.",
    "Charity to rivals: the student can state the strongest live alternative before critiquing it.",
    "Bridge discipline: the student does not let a thicker conclusion inherit the support of a thinner one.",
    "Intellectual honesty: the student can name what would change their mind and where prior pressure may be doing work.",
]

BRIDGE_ROWS = [
    ("Narrow Range", "What turns life-permitting from a description of our location into a genuinely narrow target?", "A real comparison range, a reason that range is not arbitrary, and a clear account of why the life-permitting region is impressively small."),
    ("Probability Measure", "What measure over alternatives is being used, and why is it not merely smuggled in?", "A defensible space of alternatives, a fair weighting scheme, and a reason the measure was not chosen just to make life look rare."),
    ("Observer Selection", "What keeps anthropic selection from doing most of the explanatory work here?", "A clear statement of what observation-selection explains and what feature remains more surprising under impersonal processes than under design."),
    ("Impersonal Alternatives", "Which impersonal alternatives remain live, and why do they fail relative to design?", "Named live competitors, their likely predictions, and a fair comparison showing why purposive calibration still performs better."),
    ("Design Step", "Why does the case move from fine-tuning to design rather than merely to unexplained selectivity?", "A direct explanation of what design adds beyond surprise and why agency explains the pattern better than the live impersonal rivals do."),
    ("Life Target", "What makes life the target instead of one more byproduct inside a vast physical process?", "A reason the observed cosmos looks aimed at life rather than merely permitting one local pocket inside a larger non-biological system."),
    ("Human Target", "What licenses the move from life-permitting to human-centered or person-centered purpose?", "A reason persons stand out more than sparse life, rare observers, or opaque ends as the visible target of the arrangement."),
    ("Theistic Step", "What bridge turns generic design into anything like personal theism or Christianity?", "A real argument from calibration to personal agency and from personal agency to moral, revelatory, or specifically Christian concern."),
]

SESSION_PLANS = [
    {
        "number": 1,
        "title": "Why this tool exists",
        "central_question": "What problem does the Fine-Tuning Bridge Audit solve that ordinary apologetics talk often hides?",
        "goals": [
            "Students can state the difference between a striking fact and an earned conclusion.",
            "Students can explain why the tool is prior, not final.",
            "Students can name one way confidence can outrun support."
        ],
        "materials": "Beach image slide, a small stack of stones, sticky notes, printed course norms, opening reflection sheet.",
        "hook": "Begin by silently stacking five stones in front of the group. Ask, 'What did you just assume about how this happened?' Then reveal that the course is about everything smuggled into that first instinct.",
        "mini_lesson": "Teach the basic moral logic of the course: life-permitting is not the same as designed, designed is not the same as life-aimed, life-aimed is not the same as human-centered, and none of that is yet Christianity.",
        "lab": "Students sort twelve sample statements into 'observation,' 'interpretation,' and 'borrowed conclusion' columns, then defend one placement each.",
        "discussion": "Where do students feel the pull to move quickly? Which leaps feel emotionally obvious but evidentially thin?",
        "exit_ticket": "Complete the sentence: 'This tool matters because it keeps me from ...'",
        "homework": "Write a one-page reflection on a belief you hold strongly and name at least one source of confidence besides direct evidence.",
        "teacher_moves": [
            "Praise students who narrow claims rather than inflate them.",
            "Use humor to make overreach visible without shaming anyone.",
            "Keep saying, 'A cleaner sentence is a win.'"
        ],
        "watch_for": "Some students will hear 'slow down' as 'stop believing.' Keep clarifying that the aim is honest sequencing, not premature debunking.",
    },
    {
        "number": 2,
        "title": "The four claim levels",
        "central_question": "Exactly what are we asking fine-tuning to support?",
        "goals": [
            "Students can distinguish design only, life purpose, human purpose, and Christian purpose.",
            "Students can rewrite inflated claims into thinner ones.",
            "Students see why each rung adds a new burden of proof."
        ],
        "materials": "Claim ladder poster, route cards, examples from sermons, books, and debates.",
        "hook": "Read four short apologetics lines that sound similar. Ask students to place them physically on a floor ladder from thin to thick.",
        "mini_lesson": "Show that each rung answers a different question. Design only asks for purposive calibration. Life purpose adds target. Human purpose adds personal focus. Christian purpose adds a whole new bridge into revelation and theology.",
        "lab": "In teams, students sort twenty claims into the four route categories, then revise any mixed or blurry claim until it fits one rung cleanly.",
        "discussion": "Which rung is most often borrowed for free in Christian discussion? Why?",
        "exit_ticket": "Write one sentence that sounds impressive but actually mixes two different rungs together.",
        "homework": "Collect three public examples of fine-tuning language and label which rung each one is really asking for.",
        "teacher_moves": [
            "Keep the ladder visible the entire session.",
            "Ask 'What extra claim just got added?' whenever a student moves upward.",
            "Celebrate precise wording."
        ],
        "watch_for": "Students often hear 'design' and 'God' as synonyms. Do not let that equivalence settle into the room.",
    },
    {
        "number": 3,
        "title": "Prior pressure",
        "central_question": "How can confidence arrive before the bridge work is finished?",
        "goals": [
            "Students can define identity pull, delegated trust, symmetry willingness, and mind-change willingness.",
            "Students can explain why prior pressure is not the same as falsity.",
            "Students can name what would genuinely move them."
        ],
        "materials": "Anonymous slider cards, commitment worksheet, paired interview prompts.",
        "hook": "Ask students to stand on a line between 'I would change my mind quickly' and 'I would only change my mind if several beliefs changed at once.' Debrief without pressure to justify yet.",
        "mini_lesson": "Teach prior pressure as background commitment pressure. High prior pressure does not prove a conclusion false. It warns that some confidence may be arriving early through identity, trust, fear of loss, or asymmetry.",
        "lab": "Students complete a private prior-pressure audit, then interview a partner using prewritten curiosity-based prompts rather than adversarial ones.",
        "discussion": "Why is it morally difficult to admit that background loyalties are doing part of the work?",
        "exit_ticket": "Finish this sentence: 'A sign that my prior pressure might be high is ...'",
        "homework": "Write two mind-change conditions: one that would increase confidence and one that would lower it.",
        "teacher_moves": [
            "Model vulnerability by giving one of your own live pressure points.",
            "Keep the exercise confessional, not competitive.",
            "Remind students that honest self-knowledge is not self-betrayal."
        ],
        "watch_for": "Students may weaponize prior pressure against others. Keep it first-person and reflective.",
    },
    {
        "number": 4,
        "title": "Narrow Range and Probability Measure",
        "central_question": "What does it really mean to say life-permitting conditions are narrow or unlikely?",
        "goals": [
            "Students can explain why 'rare' is meaningless without a fair comparison range and measure.",
            "Students can distinguish rhetorical improbability from argued improbability.",
            "Students can state what stronger support would look like for both entry bridges."
        ],
        "materials": "Number-line game, colored grids, dice, bridge cards 1 and 2.",
        "hook": "Run a target-zone game: three students choose different hidden ranges on a long number strip. Reveal how easy it is to call something 'improbable' after the fact.",
        "mini_lesson": "Teach Bridge 1 and Bridge 2 together. A narrow target needs a real comparison range. An unlikely target also needs a fair weighting across alternatives. Otherwise 'fine-tuned' can become shorthand for 'I find this striking.'",
        "lab": "Teams analyze sample fine-tuning statements and mark where the range is undefined, where the measure is assumed, and where each problem is partly repaired.",
        "discussion": "Why do measure questions feel less exciting than big design claims, and why does that matter?",
        "exit_ticket": "What exact question should you ask the next time someone says, 'That would be astronomically unlikely'?",
        "homework": "Produce one paragraph answering: 'Why does a fair measure matter before we call fine-tuning surprising?'",
        "teacher_moves": [
            "Keep examples tactile and visual.",
            "Translate mathematical language back into ordinary comparison questions.",
            "Do not let students hide behind vague phrases like 'obviously rare.'"
        ],
        "watch_for": "Students can get lost in technicality. The win is conceptual honesty, not mastery of physics.",
    },
    {
        "number": 5,
        "title": "Observer Selection and Impersonal Alternatives",
        "central_question": "What still needs explaining once we take our observer-position seriously?",
        "goals": [
            "Students can explain observer selection in plain terms.",
            "Students can state at least three live impersonal alternatives without caricature.",
            "Students can explain why design only gains force through fair comparison."
        ],
        "materials": "Role cards, debate grid, bridge cards 3 and 4, comparison chart.",
        "hook": "Ask: 'If fish only observe water, is water therefore surprising evidence that aquariums were built for fish?' Use the awkwardness of the analogy to open the real issue.",
        "mini_lesson": "Teach why observers can only observe observer-permitting regions, and why that limits what the bare observation itself can prove. Then list live impersonal alternatives: brute chance, deeper necessity, unknown future physics, multiverse-style generation, or other impersonal search processes.",
        "lab": "Three-way role play: design advocate, impersonal-process advocate, and bridge auditor. The auditor can only ask clarifying questions and demand fair comparisons.",
        "discussion": "When does an alternative count as genuinely live rather than merely imaginable?",
        "exit_ticket": "What part of the puzzle might observer selection already explain?",
        "homework": "Write the strongest impersonal competitor you can, as if you wanted it to sound persuasive.",
        "teacher_moves": [
            "Require charity before critique.",
            "Keep alternatives concrete enough to have predictions.",
            "Use the phrase 'design by default' as a warning label."
        ],
        "watch_for": "Students may treat 'unknown future physics' as a lazy escape hatch. Distinguish between a real live competitor and a contentless placeholder.",
    },
    {
        "number": 6,
        "title": "The design step",
        "central_question": "When, if ever, is purposive calibration a better explanation than unexplained selectivity?",
        "goals": [
            "Students can say what the design step actually adds.",
            "Students can separate surprise from agency.",
            "Students can identify what a better design argument would need."
        ],
        "materials": "Pattern cards, hidden-intention cases, bridge card 5, whiteboard comparison matrix.",
        "hook": "Present three patterns: a random-looking blot, a symmetrical mark, and a written sentence. Ask which ones invite agency and why. Then complicate every answer.",
        "mini_lesson": "Design is not the same as 'interesting.' The bridge must show what design explains better than live rivals do, and why purposive calibration is more than a label attached to improbability.",
        "lab": "Students fill a comparison matrix with columns for 'feature to explain,' 'impersonal explanation,' 'design explanation,' and 'what still remains unclear.'",
        "discussion": "What is the difference between 'this deserves explanation' and 'this was aimed at an end'?",
        "exit_ticket": "Name one sentence that sounds like a design argument but is really just a surprise argument.",
        "homework": "Write a cleaned-up version of a design claim that names the exact feature design supposedly explains.",
        "teacher_moves": [
            "Push for specificity.",
            "Do not let 'best explanation' become an empty compliment.",
            "Ask what prediction or explanatory gain design actually buys."
        ],
        "watch_for": "Students may think the only alternatives are design or absurdity. Keep live middle spaces open.",
    },
    {
        "number": 7,
        "title": "Life target",
        "central_question": "Why think life is the target rather than one byproduct inside a much larger physical process?",
        "goals": [
            "Students can distinguish life-permitting from life-aimed.",
            "Students can compare life with other possible targets such as order, stars, or black holes.",
            "Students can explain why one local life pocket may still be evidentially thin."
        ],
        "materials": "Target cards, bridge card 6, universe-output worksheet, photo slides of stars, galaxies, and barren worlds.",
        "hook": "Show a sequence of cosmic images and ask, 'If this universe had a target, what would you guess it was from the visible output alone?'",
        "mini_lesson": "A life-permitting universe is not automatically a life-aimed universe. Large-scale structure, elegance, stars, or something unknown could still be the more natural reading of the visible cosmos.",
        "lab": "Students compare five candidate targets and score which seems most visible in the observed universe and which requires the least extra imagination.",
        "discussion": "What would a clearly life-aimed universe look more like than our own?",
        "exit_ticket": "Complete the sentence: 'Life becomes a stronger target claim when ...'",
        "homework": "Write a paragraph explaining why 'some life somewhere' is not the same as 'life is the main point.'",
        "teacher_moves": [
            "Keep the universe visually present, not just verbally described.",
            "Press students to distinguish possibility from evidential visibility.",
            "Use the tool's own slider logic in plain language."
        ],
        "watch_for": "Students may confuse their love of life with evidence that life is the cosmic target.",
    },
    {
        "number": 8,
        "title": "Human target and theistic step",
        "central_question": "What, if anything, licenses a move from life to persons, and from generic design to Christianity?",
        "goals": [
            "Students can explain why the human-target step is thicker than the life-target step.",
            "Students can explain why theistic or Christian conclusions require further bridges.",
            "Students can catch borrowed-conclusion language in real time."
        ],
        "materials": "Bridge cards 7 and 8, sample apologetics excerpts, red-flag stickers.",
        "hook": "Read a polished Christian apologetics paragraph. Students clap when the text jumps a rung without paying for it.",
        "mini_lesson": "Humans or moral persons do not automatically emerge as the visible target of a sparse cosmos. Even if design were granted, a generic designer, a deistic architect, opaque ends, and the God of Christian theology are not interchangeable outcomes.",
        "lab": "Students annotate several real or realistic arguments, marking where life becomes persons, where persons become moral agency, and where agency becomes Christianity without enough bridge work.",
        "discussion": "Why do later religious claims feel more emotionally resonant than the earlier fine-tuning data can bear?",
        "exit_ticket": "Which borrowed move is most common: life to humans, or design to Christianity?",
        "homework": "Write a clean statement of what evidence would have to be added to move from thin design toward personal theism.",
        "teacher_moves": [
            "Keep the tone curious, not mocking.",
            "Separate evidential discipline from hostility to religion.",
            "Keep asking, 'What new bridge just got introduced?'"
        ],
        "watch_for": "Students with strong Christian commitments may feel exposed. Reassure them that the issue is sequence and support, not disrespect.",
    },
    {
        "number": 9,
        "title": "The beach analogy and world-shape",
        "central_question": "What kind of universe would each route naturally predict?",
        "goals": [
            "Students can use A, B, and C accurately.",
            "Students can map the observed universe and rival models onto the beach scenarios.",
            "Students can explain why world-shape matters for diagnosis."
        ],
        "materials": "Large printed beach image, floor tape, scenario cards A/B/C, case-study packets.",
        "hook": "Turn the room into three beaches. Students physically stand where they think the actual universe, a natural-emergence model, a sparse designer, a life-maximizer, and a human-centered designer belong.",
        "mini_lesson": "The analogy forces a distinction between one rare life pocket in a massive arena, one stack on a tiny beach, and stacks nearly everywhere. Those are not interchangeable expectations.",
        "lab": "Teams receive four worldview or argument profiles and must map each one to A, B, or C with a short defense. They then critique one another's mapping for hidden assumptions.",
        "discussion": "Why is the actual universe's sparseness such a pressure point for thicker claims?",
        "exit_ticket": "Which beach best fits the actual universe, and why?",
        "homework": "Write one page on how a human-centered route would need the world-shape to look different in order to feel more natural.",
        "teacher_moves": [
            "Keep students moving physically; this session should feel memorable.",
            "Return often to the actual observed cosmos.",
            "Do not let the analogy become a proof by itself. It is a pressure test."
        ],
        "watch_for": "Students may start answering what they wish a designer would do rather than what the observed universe actually resembles.",
    },
    {
        "number": 10,
        "title": "Target ambiguity and goal sliders",
        "central_question": "Even under design, why assume the target is humans rather than order, sparse life, or opaque ends?",
        "goals": [
            "Students can define target ambiguity.",
            "Students can compare non-life, life, and human/person targets.",
            "Students can explain economical sufficiency without letting it do invisible work."
        ],
        "materials": "Target sliders worksheet, colored chips, goal cards, example diagnoses.",
        "hook": "Ask students to imagine a designer who wanted only elegant equations, or only stars, or only one pocket of life. Which worlds would look different from ours, and which might not?",
        "mini_lesson": "The tool keeps multiple targets visible: order or elegance, stars or black holes, a little life somewhere, abundant life, humans or human-like persons, unknown ends, and economical sufficiency. The point is not to deny design. The point is to resist assuming a human-centered target too quickly.",
        "lab": "Students build three goal profiles with chips and then write one sentence describing the universe each profile would naturally predict.",
        "discussion": "When does divine economy clarify something, and when does it merely excuse a mismatch?",
        "exit_ticket": "What is one target that a student in church might rarely consider, but should?",
        "homework": "Write a short comparison between a sparse-life designer and a human-centered designer using the actual universe as the test case.",
        "teacher_moves": [
            "Keep alternate targets psychologically real, not silly caricatures.",
            "Use the phrase 'plausible target, not merely possible target.'",
            "Press students to separate unknown ends from lazy hand-waving."
        ],
        "watch_for": "Economy may become a universal solvent. Keep showing that economy alone does not bridge to humans or Christianity.",
    },
    {
        "number": 11,
        "title": "Reading the diagnosis",
        "central_question": "How do we read the tool's output without turning it into a verdict machine?",
        "goals": [
            "Students can explain claim asked for, highest fully earned claim, highest still tentatively live, prior pressure, world-shape tension, human-target pressure, and the pressure list.",
            "Students can produce one honest final sentence from a case.",
            "Students can identify the best repair move."
        ],
        "materials": "Diagnosis screenshot set, summary-output template, highlighters, case-study runs from the presets.",
        "hook": "Display two diagnoses that feel emotionally opposite but are both honest. Ask, 'Why is neither one a final worldview verdict?'",
        "mini_lesson": "Teach the outputs as a present-tense read of the argument, not as a courtroom sentence. The strict ceiling is the real limit. The tentative ceiling is a maybe. Yellow flags appear only when the current inputs create pressure.",
        "lab": "Students work through two preset cases and write a three-line diagnosis: current ceiling, strongest pressure point, and best repair move.",
        "discussion": "Why is a cleaner sentence often better than a stronger sentence?",
        "exit_ticket": "What is the difference between a strict ceiling and a tentative ceiling?",
        "homework": "Prepare a draft capstone sentence and a list of two unresolved pressure points.",
        "teacher_moves": [
            "Normalize intellectual deflation as progress.",
            "Use the phrase 'current read, not final verdict.'",
            "Keep pressure points concrete and revisable."
        ],
        "watch_for": "Students may read the outputs as if the tool is secretly settling naturalism versus theism. Keep redirecting to bridge support.",
    },
    {
        "number": 12,
        "title": "Capstone: the honest ceiling presentation",
        "central_question": "Can the student carry the whole discipline of the tool in one clear public explanation?",
        "goals": [
            "Students can present a full case audit with clarity and honesty.",
            "Students can answer questions without overclaiming.",
            "Students can identify one wise next step for further inquiry."
        ],
        "materials": "Capstone rubric, presentation template, timer, peer feedback slips.",
        "hook": "Open with the line: 'Today the goal is not to win a case. It is to tell the truth about a case.'",
        "mini_lesson": "Briefly review the capstone structure: selected route, strict ceiling, tentative ceiling, main pressure points, strongest live alternative, and best repair move.",
        "lab": "Each student gives a five-minute presentation and a two-minute response to questions. Peers score clarity, charity, bridge discipline, and honesty.",
        "discussion": "What changed in your thinking during the course? What became thinner, stronger, or more carefully worded?",
        "exit_ticket": "What is one sentence you can now say more honestly than you could at the start?",
        "homework": "None. Instead, invite students to write a private post-course note to themselves about what they want to keep practicing.",
        "teacher_moves": [
            "Treat every sincere narrowing of a claim as intellectual courage.",
            "Ask follow-up questions that reward precision, not bravado.",
            "End the course with gratitude and seriousness."
        ],
        "watch_for": "Students may still try to smuggle in wider worldview commitments during Q and A. Gently bring them back to the chosen route and visible bridge work.",
    },
]

CAPSTONE_RUBRIC = [
    ("Route clarity", "Student clearly names the selected route and does not blur it with a thicker one.", "1-4"),
    ("Bridge accuracy", "Student identifies which bridges are missing, asserted, or substantiated with real support.", "1-4"),
    ("World-shape reasoning", "Student uses the beach analogy accurately and compares actual universe with route-relevant expectation.", "1-4"),
    ("Rival explanation charity", "Student states the strongest live impersonal or thinner alternative fairly before critiquing it.", "1-4"),
    ("Honesty about pressure", "Student can name prior pressure, world-shape tension, or human-target pressure without defensiveness.", "1-4"),
    ("Final sentence discipline", "Student ends with a narrow, honest conclusion rather than an inflated one.", "1-4"),
]

GLOSSARY_ROWS = [
    ("Claim level", "The exact job you want fine-tuning to do: design only, life purpose, human purpose, or Christian purpose."),
    ("Bridge", "A premise needed to move from one rung of the claim ladder to the next."),
    ("Strict ceiling", "The highest claim currently earned by substantiated bridges with real support notes."),
    ("Tentative ceiling", "The highest claim that could still survive if the asserted bridges later prove strong."),
    ("Prior pressure", "Background pressure from identity pull, delegated trust, asymmetry, or weak willingness to change one's mind."),
    ("World-shape tension", "The mismatch between the actual universe and the kind of universe the chosen route would naturally predict."),
    ("Target ambiguity", "The fact that even under design, the target may still be unclear or nonhuman."),
    ("Human-target pressure", "Pressure created when the case leans toward persons more quickly than the bridge support allows."),
]


def on_page(canvas, doc):
    page_width, page_height = letter
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.7)
    canvas.line(doc.leftMargin, page_height - 42, page_width - doc.rightMargin, page_height - 42)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8.5)
    canvas.drawString(doc.leftMargin, page_height - 32, "Crosshairs Audit Lab")
    canvas.drawRightString(page_width - doc.rightMargin, 28, f"Fine-Tuning Curriculum  |  {canvas.getPageNumber()}")
    canvas.restoreState()


def make_doc(path: Path):
    doc = BaseDocTemplate(
        str(path),
        pagesize=letter,
        leftMargin=0.72 * inch,
        rightMargin=0.72 * inch,
        topMargin=0.8 * inch,
        bottomMargin=0.62 * inch,
        title="Fine-Tuning Honesty Lab Curriculum",
        author="Phil Stilwell",
        subject="Teacher-facing small-group curriculum for the Fine-Tuning Bridge Audit",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="normal")
    doc.addPageTemplates([PageTemplate(id="curriculum", frames=[frame], onPage=on_page)])
    return doc


def hyphen_list(items):
    return [Paragraph(f"- {item}", styles["CurriculumBullet"]) for item in items]


def section(title, kicker=None):
    elements = []
    if kicker:
        elements.append(Paragraph(kicker, styles["Kicker"]))
    elements.append(Paragraph(title, styles["SectionTitle"]))
    return elements


def callout(title, body, tint=TEAL_SOFT):
    body_flow = [Paragraph(f"<b>{title}</b>", styles["SubTitle"]), Paragraph(body, styles["Body"])]
    table = Table([[body_flow]], colWidths=[6.5 * inch])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), tint),
                ("BOX", (0, 0), (-1, -1), 0.8, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    return table


def table_block(rows, widths, header_fill=TEAL_SOFT):
    table = Table(rows, colWidths=list(widths), hAlign="LEFT", repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), header_fill),
                ("TEXTCOLOR", (0, 0), (-1, 0), INK),
                ("BOX", (0, 0), (-1, -1), 0.8, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def cover_block():
    elements = []
    elements.append(Spacer(1, 0.35 * inch))
    elements.append(Paragraph("Crosshairs Audit Lab", styles["Kicker"]))
    elements.append(Paragraph("Fine-Tuning Honesty Lab", styles["CurriculumTitle"]))
    elements.append(
        Paragraph(
            "A full small-group curriculum for teaching the core contents of the Fine-Tuning Bridge Audit to young, honest seekers.",
            styles["CurriculumSubtitle"],
        )
    )
    elements.append(
        callout(
            "What this curriculum is designed to do",
            "This is a teacher-facing guide for forming intellectual honesty, not merely transmitting arguments. It trains students to separate life-permitting from life-abundant claims, to test bridge premises one by one, and to say more honestly how far a fine-tuning argument really goes.",
            tint=SAND,
        )
    )
    elements.append(Spacer(1, 0.18 * inch))
    if BEACH_IMAGE.exists():
        elements.append(Image(str(BEACH_IMAGE), width=6.45 * inch, height=2.56 * inch))
        elements.append(Spacer(1, 0.1 * inch))
        elements.append(
            Paragraph(
                "The beach analogy is the course's anchor image: A is a massive beach with one rare five-high stack, B is a tiny one-square-meter beach with one five-high stack, and C is a massive beach with stacks nearly everywhere.",
                styles["SmallNote"],
            )
        )
    elements.append(Spacer(1, 0.18 * inch))
    elements.append(
        table_block(
            [
                [Paragraph("<b>This curriculum equips students to</b>", styles["BodyTight"]), Paragraph("<b>This curriculum refuses to do</b>", styles["BodyTight"])],
                [
                    Paragraph("name claim levels, audit bridges, compare world-shapes, read pressure signals, and present one honest final sentence.", styles["BodyTight"]),
                    Paragraph("treat the tool as a verdict machine, mock religious students, or allow later theistic claims to borrow early support for free.", styles["BodyTight"]),
                ],
            ],
            widths=(3.2 * inch, 3.2 * inch),
        )
    )
    elements.append(Spacer(1, 0.18 * inch))
    elements.append(
        Paragraph(
            "Recommended format: 12 sessions, 90 minutes each, for a group of 6 to 18 students led by a dynamic teacher who values clarity, curiosity, and disciplined speech.",
            styles["Body"],
        )
    )
    elements.append(PageBreak())
    return elements


def build_overview_page():
    story = []
    story.extend(section("1. Course overview", "Frame"))
    story.append(
        Paragraph(
            "This curriculum is built for sincere young seekers who are strong enough to let a conclusion become thinner when the support is thinner. It does not assume that every student is skeptical, nor that every student is already persuaded by fine-tuning. It assumes only that the group is willing to keep the early steps honest so that later conclusions do not inherit more support than they have earned.",
            styles["Body"],
        )
    )
    story.append(callout("North-star outcome", "By the end of the course, each student should be able to state the narrowest claim the current evidence supports, the main bridges still missing, the strongest live alternative, and one honest next step for further inquiry."))
    story.append(Paragraph("Primary learning outcomes", styles["SubTitle"]))
    story.extend(hyphen_list(COURSE_OUTCOMES))
    story.append(Paragraph("Teacher posture and room norms", styles["SubTitle"]))
    story.extend(hyphen_list(COURSE_NORMS))
    story.append(PageBreak())
    return story


def build_course_map_page():
    story = []
    story.extend(section("2. Course map and pacing", "Sequence"))
    story.append(
        Paragraph(
            "The curriculum is organized in four units. Each unit advances the students from posture, to vocabulary, to bridge analysis, to diagnosis, and finally to public synthesis.",
            styles["Body"],
        )
    )
    unit_rows = [
        [Paragraph("<b>Unit</b>", styles["BodyTight"]), Paragraph("<b>Purpose</b>", styles["BodyTight"]), Paragraph("<b>Sessions</b>", styles["BodyTight"])],
        [Paragraph("Unit 1", styles["BodyTight"]), Paragraph("Posture, overreach, and the four claim levels", styles["BodyTight"]), Paragraph("1-3", styles["BodyTight"])],
        [Paragraph("Unit 2", styles["BodyTight"]), Paragraph("The eight bridges and the move from fine-tuning toward design", styles["BodyTight"]), Paragraph("4-8", styles["BodyTight"])],
        [Paragraph("Unit 3", styles["BodyTight"]), Paragraph("World-shape, target ambiguity, and the diagnosis outputs", styles["BodyTight"]), Paragraph("9-11", styles["BodyTight"])],
        [Paragraph("Unit 4", styles["BodyTight"]), Paragraph("Capstone synthesis and public articulation", styles["BodyTight"]), Paragraph("12", styles["BodyTight"])],
    ]
    story.append(table_block(unit_rows, widths=(1.0 * inch, 3.95 * inch, 1.55 * inch)))
    story.append(Spacer(1, 0.12 * inch))
    session_rows = [[Paragraph("<b>Session</b>", styles["BodyTight"]), Paragraph("<b>Theme</b>", styles["BodyTight"]), Paragraph("<b>Main caution</b>", styles["BodyTight"])]]
    for session in SESSION_PLANS:
        session_rows.append(
            [
                Paragraph(f"{session['number']}. {session['title']}", styles["BodyTight"]),
                Paragraph(session["central_question"], styles["BodyTight"]),
                Paragraph(session["watch_for"], styles["BodyTight"]),
            ]
        )
    story.append(table_block(session_rows, widths=(1.55 * inch, 2.65 * inch, 2.3 * inch), header_fill=SAND))
    story.append(Spacer(1, 0.12 * inch))
    story.append(Paragraph("Student artifacts this course should produce", styles["SubTitle"]))
    story.extend(
        hyphen_list(
            [
                "A seeker journal tracking where confidence comes from and what would change the student's mind.",
                "A claim ladder card that keeps design only, life purpose, human purpose, and Christian purpose distinct.",
                "An eight-bridge ledger with notes showing what is actually doing the work.",
                "A beach analogy worksheet mapping the observed universe and rival models to A, B, or C.",
                "A diagnosis sheet naming strict ceiling, tentative ceiling, and main pressure points.",
                "A capstone two-page audit and a five-minute oral presentation.",
            ]
        )
    )
    story.append(
        callout(
            "Recommended group structure",
            "Use changing pairs for reflective work, triads for bridge analysis, and full-group discussion for diagnosis. Rotate roles such as explainer, rival advocate, and bridge auditor so every student practices charity as well as critique.",
            tint=TEAL_SOFT,
        )
    )
    story.append(PageBreak())
    return story


def build_teacher_toolkit_page():
    story = []
    story.extend(section("3. Teacher toolkit", "Facilitation"))
    story.append(
        Paragraph(
            "The teacher for this course should be more host than prosecutor. The strongest sessions feel alive, visual, and dialogical. Students should sense that careful thinking is being honored, not that cleverness is being rewarded.",
            styles["Body"],
        )
    )
    story.append(Paragraph("Recommended recurring teacher moves", styles["SubTitle"]))
    story.extend(
        hyphen_list(
            [
                "Keep the claim ladder visible every week.",
                "Frequently ask, 'What exactly is doing the work here?'",
                "Frequently ask, 'What would this route naturally predict the universe to look like?'",
                "Reward students who narrow a conclusion with more respect, not less.",
                "Use physical movement, images, cards, and role-play to keep the course memorable.",
                "End most sessions by translating a big idea into one plain final sentence.",
            ]
        )
    )
    story.append(Paragraph("Reusable materials", styles["SubTitle"]))
    story.extend(
        hyphen_list(
            [
                "Claim ladder poster and route cards",
                "Bridge cards for all eight bridges",
                "Large printed beach image or projected beach slide",
                "Scenario A/B/C floor markers",
                "Goal slider chips or scoring cards",
                "Diagnosis worksheet and capstone rubric",
            ]
        )
    )
    story.append(
        callout(
            "Safeguard against misuse",
            "Do not let students weaponize the tool. It is not for humiliating believers, nor for forcing skepticism. It is for telling the truth about how far the visible bridge work really goes.",
            tint=ALERT,
        )
    )
    story.append(PageBreak())
    return story


def session_plan_block(session):
    rows = [
        [Paragraph("<b>Session frame</b>", styles["BodyTight"]), Paragraph("<b>Plan</b>", styles["BodyTight"])],
        [Paragraph("Central question", styles["BodyTight"]), Paragraph(session["central_question"], styles["BodyTight"])],
        [Paragraph("Learning goals", styles["BodyTight"]), Paragraph("<br/>".join(f"- {goal}" for goal in session["goals"]), styles["BodyTight"])],
        [Paragraph("Prep and materials", styles["BodyTight"]), Paragraph(session["materials"], styles["BodyTight"])],
        [Paragraph("Opening hook", styles["BodyTight"]), Paragraph(session["hook"], styles["BodyTight"])],
        [Paragraph("Mini lesson", styles["BodyTight"]), Paragraph(session["mini_lesson"], styles["BodyTight"])],
        [Paragraph("Lab or activity", styles["BodyTight"]), Paragraph(session["lab"], styles["BodyTight"])],
        [Paragraph("Discussion focus", styles["BodyTight"]), Paragraph(session["discussion"], styles["BodyTight"])],
        [Paragraph("Exit ticket", styles["BodyTight"]), Paragraph(session["exit_ticket"], styles["BodyTight"])],
        [Paragraph("Between-session task", styles["BodyTight"]), Paragraph(session["homework"], styles["BodyTight"])],
        [Paragraph("Teacher moves", styles["BodyTight"]), Paragraph("<br/>".join(f"- {move}" for move in session["teacher_moves"]), styles["BodyTight"])],
        [Paragraph("Watch for", styles["BodyTight"]), Paragraph(session["watch_for"], styles["BodyTight"])],
    ]
    return table_block(rows, widths=(1.48 * inch, 4.92 * inch), header_fill=TEAL_SOFT)


def build_session_pages():
    story = []
    for session in SESSION_PLANS:
        story.extend(section(f"{session['number']}. {session['title']}", "Session plan"))
        story.append(
            Paragraph(
                "Suggested rhythm for a 90-minute meeting: 10 minutes recap and opening question, 15 minutes creative hook, 20 minutes direct teaching, 25 minutes lab, 15 minutes debrief, 5 minutes exit ticket.",
                styles["Body"],
            )
        )
        story.append(session_plan_block(session))
        if session["number"] != SESSION_PLANS[-1]["number"]:
            story.append(PageBreak())
    return story


def build_bridge_reference_page():
    story = []
    story.extend(section("4. Bridge reference", "Appendix"))
    story.append(
        Paragraph(
            "Use this appendix as a quick teacher reference whenever students confuse bridge labels with bridge support. The question column states what each bridge is really asking. The stronger support column tells you what a better answer would actually have to include.",
            styles["Body"],
        )
    )
    rows = [
        [Paragraph("<b>Bridge</b>", styles["BodyTight"]), Paragraph("<b>Question</b>", styles["BodyTight"]), Paragraph("<b>What stronger support looks like</b>", styles["BodyTight"])]
    ]
    for title, question, stronger in BRIDGE_ROWS:
        rows.append(
            [
                Paragraph(title, styles["BodyTight"]),
                Paragraph(question, styles["BodyTight"]),
                Paragraph(stronger, styles["BodyTight"]),
            ]
        )
    story.append(table_block(rows, widths=(1.2 * inch, 2.5 * inch, 2.8 * inch), header_fill=SAND))
    story.append(PageBreak())
    return story


def build_assessment_pages():
    story = []
    story.extend(section("5. Assessment and capstone", "Evaluation"))
    story.append(
        Paragraph(
            "Assessment in this course should reward clarity, charity, and self-suspicion more than rhetorical force. Students are not being graded on whether they end up pro-design or anti-design. They are being graded on whether they speak more truthfully about the support they actually have.",
            styles["Body"],
        )
    )
    story.append(Paragraph("Assessment pillars", styles["SubTitle"]))
    story.extend(hyphen_list(ASSESSMENT_PILLARS))
    story.append(Paragraph("Suggested assessment sequence", styles["SubTitle"]))
    story.extend(
        hyphen_list(
            [
                "Pre-course diagnostic: what do you think fine-tuning proves right now?",
                "Weekly exit tickets: one concept mastered, one confusion, one overreach caught.",
                "Mid-course oral check: explain the beach analogy, strict versus tentative ceiling, and one live alternative.",
                "Capstone presentation: five minutes plus two minutes of questions.",
            ]
        )
    )
    rubric_rows = [
        [Paragraph("<b>Capstone criterion</b>", styles["BodyTight"]), Paragraph("<b>What success looks like</b>", styles["BodyTight"]), Paragraph("<b>Score</b>", styles["BodyTight"])]
    ]
    for criterion, success, score in CAPSTONE_RUBRIC:
        rubric_rows.append(
            [
                Paragraph(criterion, styles["BodyTight"]),
                Paragraph(success, styles["BodyTight"]),
                Paragraph(score, styles["BodyTight"]),
            ]
        )
    story.append(table_block(rubric_rows, widths=(1.55 * inch, 4.05 * inch, 0.8 * inch)))
    story.append(PageBreak())
    return story


def build_glossary_page():
    story = []
    story.extend(section("6. Glossary and quick teacher prompts", "Reference"))
    glossary_rows = [
        [Paragraph("<b>Term</b>", styles["BodyTight"]), Paragraph("<b>Meaning</b>", styles["BodyTight"])]
    ]
    for term, meaning in GLOSSARY_ROWS:
        glossary_rows.append([Paragraph(term, styles["BodyTight"]), Paragraph(meaning, styles["BodyTight"])])
    story.append(table_block(glossary_rows, widths=(1.65 * inch, 4.75 * inch)))
    story.append(Spacer(1, 0.14 * inch))
    story.append(Paragraph("Quick teacher prompts worth repeating all semester", styles["SubTitle"]))
    story.extend(
        hyphen_list(
            [
                "What exact claim level is on the table right now?",
                "Which bridge is being used, and what is actually doing the work?",
                "What would this route naturally predict the universe to look like?",
                "What strong live rival still remains?",
                "Is this pressure about evidence, or about background commitment?",
                "What is the one cleanest sentence we can honestly say now?",
            ]
        )
    )
    story.append(
        callout(
            "Final word to the teacher",
            "If the course works, students will not merely know the tool. They will become harder to flatter with oversized conclusions, more careful with borrowed confidence, and more willing to let reality set the ceiling. That is the deeper educational win.",
            tint=TEAL_SOFT,
        )
    )
    return story


def build_story():
    story = []
    story.extend(cover_block())
    story.extend(build_overview_page())
    story.extend(build_course_map_page())
    story.extend(build_teacher_toolkit_page())
    story.extend(build_session_pages())
    story.append(PageBreak())
    story.extend(build_bridge_reference_page())
    story.extend(build_assessment_pages())
    story.extend(build_glossary_page())
    return story


def main():
    doc = make_doc(OUTPUT_PDF)
    story = build_story()
    doc.build(story)
    shutil.copyfile(OUTPUT_PDF, PUBLISHED_PDF)
    print(OUTPUT_PDF)
    print(PUBLISHED_PDF)


if __name__ == "__main__":
    main()

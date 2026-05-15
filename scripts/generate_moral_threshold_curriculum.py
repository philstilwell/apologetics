from __future__ import annotations

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.platypus.flowables import Flowable


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "curricula" / "moral-system-threshold-curriculum-v2.pdf"


PALETTE = {
    "ink": colors.HexColor("#231305"),
    "muted": colors.HexColor("#5d4533"),
    "line": colors.HexColor("#b89065"),
    "paper": colors.HexColor("#fff7e4"),
    "card": colors.HexColor("#fffaf0"),
    "gold": colors.HexColor("#8b610f"),
    "gold_soft": colors.HexColor("#fff1c8"),
    "red": colors.HexColor("#9b2f27"),
    "red_soft": colors.HexColor("#ffe8e3"),
    "green": colors.HexColor("#2f6b49"),
    "green_soft": colors.HexColor("#e8f6ed"),
    "blue": colors.HexColor("#2f578f"),
    "blue_soft": colors.HexColor("#e8f0ff"),
    "slate": colors.HexColor("#ece7dc"),
    "slate_line": colors.HexColor("#b9b0a0"),
}


PROGRAM_OUTCOMES = [
    "Distinguish a moral source, a moral conclusion, and a coherent moral system without blurring them together.",
    "Identify the primary grounding route of a moral claim and explain the route-specific weaknesses it must answer.",
    "Evaluate all eight threshold components using the tool's real categories: Missing, Asserted, and Substantiated.",
    "Use collapse labels as diagnostic translation labels rather than as insults or debate shortcuts.",
    "Revise a live moral claim honestly when a hidden assumption is exposed, instead of protecting it with rhetoric.",
    "Decide whether a claim is ready for the Moral System Stress Test and, later, for Moral Particulars.",
]


DISCUSSION_COVENANT = [
    "Clarity before confidence.",
    "Structure before conclusion.",
    "Repair before rhetoric.",
    "Charity without vagueness.",
    "Public reasons over private intensity.",
    "Revision is a strength, not an embarrassment.",
]


RECURRING_FLOW = [
    ("0-10 min", "Warm opening", "A provocative question, short case, or claim card surfaces the day's tension."),
    ("10-25 min", "Mini-teaching", "The teacher names the concept cleanly and shows where it appears in the tool."),
    ("25-45 min", "Live model", "The group watches one claim move through the threshold framework in real time."),
    ("45-65 min", "Pair or triad work", "Students test claims themselves with prompts, cards, or the actual tool."),
    ("65-80 min", "Repair round", "The group improves the weakest component rather than simply criticizing it."),
    ("80-90 min", "Reflection and exit", "Students name what is still thin, what improved, and what should happen next."),
]


ASSESSMENT_PLAN = [
    ("Pre-course diagnostic", "Each participant writes one moral claim and answers: what makes it true, why it binds, and how someone else could know it."),
    ("Weekly exit tickets", "One sharp prompt each week checks whether the student can name the weak component, the collapse risk, and the next repair question."),
    ("Mid-course oral check", "Pairs explain a route family and two threshold components aloud, without notes, while another pair listens for hidden assumptions."),
    ("Component memos", "Short written defenses force the student to substantiate selected components instead of merely gesturing toward them."),
    ("Capstone presentation", "Each participant presents a live moral claim, receives threshold questions, revises one weak component, and explains readiness for the Stress Test."),
]


PHASES = [
    {
        "label": "Phase 1",
        "title": "Distinctions and trust",
        "sessions": "1-3",
        "copy": "Teach students to slow down, define the task, and separate source, route, and system.",
        "accent": PALETTE["gold"],
        "fill": PALETTE["gold_soft"],
    },
    {
        "label": "Phase 2",
        "title": "Architecture",
        "sessions": "4-8",
        "copy": "Work through the eight threshold components until students can name the real structural gaps.",
        "accent": PALETTE["green"],
        "fill": PALETTE["green_soft"],
    },
    {
        "label": "Phase 3",
        "title": "Diagnosis and repair",
        "sessions": "9-10",
        "copy": "Interpret the tool's outputs and turn collapse labels into repair plans rather than scorekeeping.",
        "accent": PALETTE["blue"],
        "fill": PALETTE["blue_soft"],
    },
    {
        "label": "Phase 4",
        "title": "Transfer and capstone",
        "sessions": "11-12",
        "copy": "Hand claims forward into the rest of the morality sequence and let learners defend revisions publicly.",
        "accent": PALETTE["red"],
        "fill": PALETTE["red_soft"],
    },
]


ROUTE_GROUPS = [
    ("Authority routes", "Divine command, Scripture, God's nature, Church tradition", "These routes especially need Authority Check and public Moral Access to be strong."),
    ("Inner routes", "Holy Spirit, Conscience", "These routes especially need public access, testing, and dispute-resolution clarity."),
    ("Practical routes", "Reason / natural law, Harm / flourishing", "These routes especially need Truth Maker and Binding Force to be explicit."),
    ("Hybrid route", "Hybrid / mixed route", "This route must state which parts of the blend are truly load-bearing and how they fit together."),
]


COMPONENTS = [
    ("Moral Meaning", "Define moral terms before using them.", "Vocabulary without content"),
    ("Truth Maker", "Explain what makes the claim true.", "Preference or power"),
    ("Authority Check", "Show why the authority should be trusted as morally good.", "Obedience without moral test"),
    ("Moral Access", "Explain how accountable people know and test the standard.", "Hidden standard"),
    ("Binding Force", "Show why the view obligates rather than merely advises.", "Practical advice"),
    ("Case Guidance", "Show how the system decides difficult cases.", "Abstraction without decisions"),
    ("Consistent Scope", "Show who is bound and how like cases stay alike.", "Special pleading"),
    ("Correction Method", "Show how error is identified and repaired.", "Ad hoc revision"),
]


RUBRIC_ROWS = [
    ("Route clarity", "The student identifies which route is carrying the claim and does not swap routes mid-explanation."),
    ("Architectural honesty", "The student rates components carefully and does not confuse strong language with strong support."),
    ("Substantiation quality", "Grounding notes name what is actually doing the work rather than repeating the conclusion."),
    ("Collapse literacy", "The student can explain what a missing component currently collapses into and why."),
    ("Repair capacity", "The student can propose the next serious repair question instead of only criticizing the gap."),
    ("Transfer judgment", "The student can justify whether the claim should remain at Threshold or move into Stress Test."),
]


QUESTION_BANK = [
    "What is doing the work here?",
    "What makes that moral claim true rather than merely approved?",
    "Why should this authority count as morally trustworthy before obedience begins?",
    "How could an accountable outsider know whether your interpretation is right?",
    "What explains obligation here rather than utility, threat, or reward?",
    "How would this view decide the hard case before the preferred answer is known?",
    "Who is bound by this standard, and why are like cases treated alike?",
    "How would this system admit that it got something wrong and then repair it?",
]


OVERVIEW_NOTES = [
    "Teach the tool as a discipline of moral clarity, not as a shortcut to winning arguments.",
    "Keep the same live claim visible across multiple weeks so students feel the difference between naming a route, repairing a component, and surviving later pressure.",
    "Return often to the distinction between a sincere source of conviction and a publicly coherent moral system.",
    "Use the tool live whenever possible so learners see architecture, not just hear vocabulary.",
]


DELIVERY_VARIANTS = [
    (
        "Twelve-week standard path",
        "Best for churches, campus groups, and study cohorts that want paced reflection, repeated practice, and enough time for students to revise claims between meetings.",
        PALETTE["gold"],
        PALETTE["gold_soft"],
    ),
    (
        "Six-week intensive path",
        "Combine Sessions 1-2, 3-4, 5-6, 7-8, 9-10, and 11-12. Keep the same capstone expectations, but require more between-session writing and quicker claim revision.",
        PALETTE["blue"],
        PALETTE["blue_soft"],
    ),
    (
        "Retreat or weekend path",
        "Use the route, component, and diagnosis material in larger blocks, then make the capstone a live clinic on the final afternoon. This works best for mature groups that can handle sustained concentration.",
        PALETTE["red"],
        PALETTE["red_soft"],
    ),
]


RESOURCE_KIT = [
    "Printed route cards and threshold component cards",
    "Large readiness-map poster or wall-lane kit",
    "Claim clinic worksheets and capstone feedback forms",
    "Markers, sticky notes, floor tape, and a visible writing surface",
    "A short pre-course teacher note that explains why revision is a course virtue",
]


SESSION_PAYOFFS = {
    1: "Students should leave able to explain why this curriculum tests coherence before it tests final truth.",
    2: "Students should now be able to say when a view is still functioning as a source, intuition set, or rulebook rather than a full moral architecture.",
    3: "Students should be able to identify the load-bearing route of a claim and name the pressure that route must especially answer.",
    4: "Students should now rate components more honestly and explain why empty support cannot count as full substantiation.",
    5: "Students should be able to distinguish moral language from moral content and say what would make a claim true rather than merely admired.",
    6: "Students should now ask how a moral standard is publicly known and why its authority counts as morally trustworthy before obedience begins.",
    7: "Students should be able to explain why a system binds and how it decides hard cases before the preferred answer is assumed.",
    8: "Students should now see how scope and correction keep a system from favoritism, convenience, and after-the-fact rescue.",
    9: "Students should be able to read diagnosis labels as translation tools and immediately pair them with the next repair question.",
    10: "Students should now use the readiness map as a bottleneck display that directs revision rather than as a prestige score.",
    11: "Students should be able to explain what clearing threshold still leaves to be tested in Stress Test and Particulars.",
    12: "Students should leave with one publicly revised claim and a stronger instinct to welcome pressure before borrowing moral certainty.",
}


SESSIONS = [
    {
        "number": 1,
        "phase": "Phase 1 · Distinctions and trust",
        "accent": PALETTE["gold"],
        "fill": PALETTE["gold_soft"],
        "title": "Orientation: why this tool exists",
        "rationale": "Open the course by defining the task cleanly: this curriculum tests whether a moral claim has enough visible architecture to count as a system at all.",
        "question": "What is the difference between sincerity, truth, coherence, and persuasion?",
        "outcomes": [
            "Explain why the threshold tool is preliminary rather than final.",
            "Name the course covenant and why revision is treated as a strength.",
            "Spot the difference between a forceful moral claim and a structured one.",
        ],
        "prep": [
            "Print the discussion covenant and the opening claim cards.",
            "Choose three sample moral statements: one thin, one middling, one strong.",
            "Set the room in a circle with a visible board or shared screen.",
        ],
        "materials": [
            "Threshold tool on screen",
            "Claim cards",
            "Index cards and markers",
            "Whiteboard or paper pad",
        ],
        "agenda": [
            ("0-12", "Opening sort", "Students sort example statements into sincere, persuasive, true-sounding, and structurally coherent."),
            ("12-25", "Mini-teaching", "Teacher defines the four categories and names the course covenant."),
            ("25-42", "Live demo", "Run one thin claim through the opening screen of the threshold tool."),
            ("42-62", "Triad talk", "Students share where they usually confuse confidence with coherence."),
            ("62-80", "Repair round", "As a group, rewrite one thin claim so it becomes more structurally serious."),
            ("80-90", "Exit ticket", "Students answer: what would count as visible moral architecture?"),
        ],
        "signature": "Use four room corners labeled Sincerity, Truth, Coherence, and Persuasion. Read a moral sentence aloud and ask students to stand where they think the sentence is strongest and weakest.",
        "teacher_moves": [
            "Keep repeating: the tool is not punishing conviction; it is clarifying architecture.",
            "Reward the first student who changes their mind publicly after hearing a better distinction.",
            "Translate emotionally loaded claims into quieter architectural questions.",
        ],
        "confusions": [
            "Students may think coherence means certainty.",
            "Some may assume the tool is an anti-Christian trap instead of an honesty device.",
            "Others may think weak structure already means false belief; slow that down immediately.",
        ],
        "exit_ticket": "Write one sentence explaining what this curriculum tests before it tests whether a view is true.",
        "assignment": "Bring one moral claim you really believe and one you hear often in church, school, or online discourse.",
    },
    {
        "number": 2,
        "phase": "Phase 1 · Distinctions and trust",
        "accent": PALETTE["gold"],
        "fill": PALETTE["gold_soft"],
        "title": "Source versus system",
        "rationale": "Most seekers can name a source of moral confidence long before they can describe a full system. This session turns that confusion into a teachable distinction.",
        "question": "When does a trusted source stop being only a source and start functioning as a full moral system?",
        "outcomes": [
            "Distinguish source, conclusion, rulebook, intuition set, and moral system.",
            "Explain why scripture, conscience, or flourishing can be real starting points without yet being a complete architecture.",
            "Use the phrase 'rule source with hidden assumptions' accurately.",
        ],
        "prep": [
            "Prepare a card deck labeled source, system, conclusion, intuition, and rulebook.",
            "Choose a scripture-centered sample claim and a flourishing-centered sample claim.",
            "Mark one claim that feels persuasive but lacks clear architecture.",
        ],
        "materials": [
            "Classification cards",
            "Sticky notes",
            "Large poster labeled Source / System / Conclusion",
        ],
        "agenda": [
            ("0-10", "Warm-up", "Students place their homework claims on the poster and explain why."),
            ("10-24", "Teaching", "Teacher distinguishes a moral source from a public moral architecture."),
            ("24-45", "Card lab", "Pairs classify statements and defend why each belongs where it does."),
            ("45-65", "Tool connection", "Run one authority claim and one practical claim through the threshold opening."),
            ("65-82", "Repair round", "Take one 'source only' claim and list what must be added for system-level coherence."),
            ("82-90", "Exit", "Students name the most common confusion they now notice."),
        ],
        "signature": "Use a giant floor continuum from 'mere source' to 'candidate moral system' and have participants physically place sample claims on it.",
        "teacher_moves": [
            "Do not let students hide behind the prestige of sacred language.",
            "Whenever someone says 'because the Bible says so,' ask what still has to be supplied for that to become a full public system.",
            "Celebrate careful distinctions more than quick answers.",
        ],
        "confusions": [
            "Students may assume calling something a source is dismissive.",
            "Some will think a system means cold rationalism rather than structured clarity.",
            "Others may confuse one correct conclusion with a stable architecture.",
        ],
        "exit_ticket": "List two things a source can provide and two things only a system can provide.",
        "assignment": "Interview a friend or parent informally: ask what makes a moral belief count as more than personal conviction.",
    },
    {
        "number": 3,
        "phase": "Phase 1 · Distinctions and trust",
        "accent": PALETTE["gold"],
        "fill": PALETTE["gold_soft"],
        "title": "Grounding routes and route-specific pressure",
        "rationale": "The route selector is not a verdict. It identifies which path is supposed to carry the claim so that the right weakness can be tested first.",
        "question": "What kind of route is carrying this claim, and what must that route especially answer?",
        "outcomes": [
            "Identify authority, inner, practical, and hybrid routes.",
            "Name the route-specific pressure each family must answer.",
            "Avoid swapping routes opportunistically when one path becomes difficult.",
        ],
        "prep": [
            "Prepare route cards with short example claims.",
            "Choose one hybrid claim that quietly changes routes when challenged.",
            "Have the route selector open on screen.",
        ],
        "materials": [
            "Route family cards",
            "Projector or shared screen",
            "Tape for a four-zone floor map",
        ],
        "agenda": [
            ("0-12", "Route map", "Students stand in one of four route zones after hearing sample claims."),
            ("12-28", "Teaching", "Teacher explains why each route family faces a particular structural pressure."),
            ("28-50", "Live audit", "Run three sample claims and discuss which route is actually doing the work."),
            ("50-70", "Pair drill", "Students rewrite a claim if its route is unclear or hidden."),
            ("70-84", "Hybrid lab", "Examine what makes a hybrid claim coherent rather than evasive."),
            ("84-90", "Exit", "Students answer: which route do I instinctively trust, and why?"),
        ],
        "signature": "Give the same moral sentence to four groups and ask each group to defend it from a different route. Then compare what changes.",
        "teacher_moves": [
            "Ask 'Which route is load-bearing?' whenever a claim sounds blended.",
            "Model charitable suspicion: maybe the student is not confused, but the route may still be unclear.",
            "Use the tool's own route labels so the curriculum stays synchronized with the app.",
        ],
        "confusions": [
            "Students may mistake a supporting reason for the primary route.",
            "Some may think hybrid always means stronger; show that it can also conceal contradiction.",
            "Others may think route choice already decides truth; it does not.",
        ],
        "exit_ticket": "Name one route family and the specific weakness it most needs to answer.",
        "assignment": "Bring a moral claim whose route is difficult to identify and be ready to defend your guess.",
    },
    {
        "number": 4,
        "phase": "Phase 2 · Architecture",
        "accent": PALETTE["green"],
        "fill": PALETTE["green_soft"],
        "title": "The rating system: Missing, Asserted, Substantiated",
        "rationale": "This session trains honesty. Learners must stop awarding themselves strength they have not yet shown on the page.",
        "question": "What justifies rating a component as substantiated rather than merely asserted?",
        "outcomes": [
            "Use all three ratings without inflating weak answers.",
            "Explain why an unsupported substantiated click still counts as asserted in the tool.",
            "Practice grounding-note discipline as part of serious moral reasoning.",
        ],
        "prep": [
            "Prepare three versions of the same component answer: missing, asserted, substantiated.",
            "Open the tool to a component card with an empty support box.",
            "Print the warning language about empty grounding notes.",
        ],
        "materials": [
            "Rating cards",
            "Sample grounding notes",
            "Threshold tool with warning state visible",
        ],
        "agenda": [
            ("0-10", "Warm-up", "Students rank three anonymous answers from strongest to weakest and defend their order."),
            ("10-26", "Teaching", "Teacher explains the rating logic and the numerical rule for empty support boxes."),
            ("26-48", "Live calibration", "Group rates multiple sample answers and then compares against the tool's own standard."),
            ("48-68", "Pair repair", "Students rewrite one asserted answer until it becomes honestly substantiated."),
            ("68-84", "Warning drill", "Click substantiated with no note and discuss why the tool refuses to trust the label alone."),
            ("84-90", "Exit", "Students define the difference between an answer that sounds complete and one that actually carries weight."),
        ],
        "signature": "Project three anonymous grounding notes and let the room vote by holding up Missing, Asserted, or Substantiated cards before discussing.",
        "teacher_moves": [
            "Treat the empty-note warning as a moral virtue lesson about intellectual honesty.",
            "Press for actual support: not 'Jesus' or 'love,' but what role that answer is supposed to play.",
            "Praise students who downgrade their own earlier ratings after hearing better standards.",
        ],
        "confusions": [
            "Students may think long wording automatically counts as substantiation.",
            "Some may confuse emotional resonance with explanatory support.",
            "Others may think asserted is a failure; teach that it is often a healthy honest midpoint.",
        ],
        "exit_ticket": "Why does the tool treat an unsupported substantiated answer as asserted?",
        "assignment": "Write one asserted answer and one substantiated answer for the same component so we can compare them next week.",
    },
    {
        "number": 5,
        "phase": "Phase 2 · Architecture",
        "accent": PALETTE["green"],
        "fill": PALETTE["green_soft"],
        "title": "Moral Meaning and Truth Maker",
        "rationale": "These first components govern whether moral language has stable content and whether moral claims can be true rather than merely affirmed.",
        "question": "What do moral words mean, and what in reality makes a moral claim true?",
        "outcomes": [
            "Explain the difference between using moral vocabulary and defining its content.",
            "Identify when a claim collapses into preference, pressure, or slogan-level rhetoric.",
            "Practice building stronger answers for Moral Meaning and Truth Maker together.",
        ],
        "prep": [
            "Prepare statements that use words like good, wrong, sacred, or duty without definition.",
            "Choose one flourishing claim and one scripture claim for comparison.",
            "Place 'vocabulary without content' and 'preference or power' visibly in the room.",
        ],
        "materials": [
            "Word-definition cards",
            "Sample claims",
            "Board space for definition trees",
        ],
        "agenda": [
            ("0-10", "Warm-up", "Students define wrong, good, and obligation in one sentence each."),
            ("10-28", "Teaching", "Teacher explains why undefined moral language and thin truth claims collapse quickly."),
            ("28-50", "Word tree exercise", "Group builds a map showing how a route gives moral words content."),
            ("50-68", "Truth-maker lab", "Students test whether a claim sounds true because of preference, command, or actual explanation."),
            ("68-84", "Repair round", "Rewrite one weak meaning answer and one weak truth-maker answer."),
            ("84-90", "Exit", "Students state one question they should now ask whenever someone says 'that's just wrong.'"),
        ],
        "signature": "Put the word 'wrong' at the center of a board and force the group to trace what the route thinks that word actually refers to.",
        "teacher_moves": [
            "Keep asking whether the claim has content or only intensity.",
            "Push students to separate a truth source from a truth maker.",
            "Invite analogies, but make sure they cash out into precise meaning.",
        ],
        "confusions": [
            "Students may think a familiar moral word needs no definition.",
            "Some may offer a source where a truth maker is required.",
            "Others may assume disagreement proves there is no truth maker; slow that inference down.",
        ],
        "exit_ticket": "Name one way a claim can sound moral while still functioning as preference or power.",
        "assignment": "Write a one-paragraph answer to either Moral Meaning or Truth Maker using a claim you personally care about.",
    },
    {
        "number": 6,
        "phase": "Phase 2 · Architecture",
        "accent": PALETTE["green"],
        "fill": PALETTE["green_soft"],
        "title": "Authority Check and Moral Access",
        "rationale": "A system needs more than authority; it needs a morally testable authority and a public way for accountable people to know the standard.",
        "question": "Why trust this authority, and how could ordinary people know when the standard has been handled well or badly?",
        "outcomes": [
            "Explain the difference between invoking authority and justifying authority.",
            "Identify when a claim leaves seekers with a hidden standard they cannot test.",
            "Practice giving public access routes without collapsing into subjectivism.",
        ],
        "prep": [
            "Prepare one authority claim and one conscience claim with dispute built into them.",
            "Collect two examples of Christians disagreeing over application.",
            "Set up a short role-play of interpretation conflict.",
        ],
        "materials": [
            "Role-play cards",
            "Interpretation dispute prompt",
            "Threshold component cards",
        ],
        "agenda": [
            ("0-12", "Role-play", "Two volunteers give different confident interpretations of the same moral claim."),
            ("12-28", "Teaching", "Teacher distinguishes authority itself from an Authority Check and then public access from private conviction."),
            ("28-48", "Interpretation lab", "Small groups answer: how would an outsider test who is reading the standard better?"),
            ("48-70", "Access drill", "Groups map the route by which a seeker is supposed to know, apply, and contest the standard."),
            ("70-84", "Repair round", "Add one missing public test or interpretive rule to a weak authority claim."),
            ("84-90", "Exit", "Students state why hidden standards feel morally serious but remain structurally weak."),
        ],
        "signature": "Run a 'two sincere interpreters' scene and ask the room what, if anything, would count as a responsible moral test between them.",
        "teacher_moves": [
            "Be gentle with students who fear public tests will dishonor faith; show that faith and accountability are not enemies.",
            "Ask whether the route leaves ordinary accountable people responsible for a standard they cannot reliably access.",
            "When students say 'the Spirit will guide,' ask how misguidance would be detected.",
        ],
        "confusions": [
            "Students may think asking for authority checks is rebellion.",
            "Some may offer personal confidence where public access is required.",
            "Others may assume public access means no mystery at all; clarify that it means usable accountability.",
        ],
        "exit_ticket": "What is the difference between having an authority and having a morally testable authority?",
        "assignment": "Write one paragraph describing how an ordinary person could know whether your chosen route was being interpreted well.",
    },
    {
        "number": 7,
        "phase": "Phase 2 · Architecture",
        "accent": PALETTE["green"],
        "fill": PALETTE["green_soft"],
        "title": "Binding Force and Case Guidance",
        "rationale": "A system must explain obligation itself and show how real decisions are made before the preferred answer is assumed.",
        "question": "Why ought anyone obey this claim, and how would the system decide a hard case under pressure?",
        "outcomes": [
            "Distinguish obligation from threat, reward, prudence, and usefulness.",
            "Identify when a view has ideals but lacks decision rules.",
            "Practice using hard cases to expose whether the system guides action or only approves outcomes after the fact.",
        ],
        "prep": [
            "Choose one costly obedience scenario and one conflict-of-duties scenario.",
            "Prepare a case where two virtues point in different directions.",
            "Bring sticky notes labeled ought, fear, benefit, and loyalty.",
        ],
        "materials": [
            "Hard-case sheets",
            "Duty-conflict cards",
            "Sticky notes",
        ],
        "agenda": [
            ("0-10", "Warm-up", "Students identify whether sample motivations express obligation, reward, fear, or convenience."),
            ("10-26", "Teaching", "Teacher explains why obligation and case-guidance are separate but connected components."),
            ("26-48", "Hard-case round", "Groups work through a dilemma before they are allowed to announce the answer they like."),
            ("48-68", "Guidance map", "Students list the rules, priorities, or interpretive moves the system would need in order to decide."),
            ("68-84", "Repair round", "Strengthen one thin explanation of why the claim binds and one weak decision procedure."),
            ("84-90", "Exit", "Students finish the sentence: a framework is not yet a moral system if it cannot ..."),
        ],
        "signature": "Make the group answer a hard case in silence first, then force them to explain the path to the answer before they defend the answer itself.",
        "teacher_moves": [
            "Do not let 'love' or 'be faithful' stand in for an actual ranking principle.",
            "Ask what the system would require if obedience became costly and invisible.",
            "When students offer a result, redirect them to the path that got there.",
        ],
        "confusions": [
            "Students may confuse feeling strongly obligated with explaining obligation.",
            "Some will turn difficult cases into testimony instead of analysis.",
            "Others may think every hard case requires certainty rather than a disciplined path to judgment.",
        ],
        "exit_ticket": "What is one sign that a view offers values but not yet an action-guiding system?",
        "assignment": "Bring one difficult case your tradition or community argues about and explain why it is hard.",
    },
    {
        "number": 8,
        "phase": "Phase 2 · Architecture",
        "accent": PALETTE["green"],
        "fill": PALETTE["green_soft"],
        "title": "Consistent Scope and Correction Method",
        "rationale": "A serious moral system must say who is bound, treat like cases alike, and admit when it has interpreted badly without turning every change into a victory lap.",
        "question": "Who is bound by this standard, and how would the system recognize and repair its own mistakes?",
        "outcomes": [
            "Identify special pleading when exceptions quietly protect favored people or institutions.",
            "Explain why correction cannot simply mean 'whatever we now say is right.'",
            "Practice naming concrete criteria for revision rather than ad hoc rescue moves.",
        ],
        "prep": [
            "Prepare examples where a rule is applied differently to insiders and outsiders.",
            "Bring one case of moral revision in church or public life.",
            "Print two cards: special pleading and ad hoc revision.",
        ],
        "materials": [
            "Case comparison sheets",
            "Revision examples",
            "Scope-mapping worksheet",
        ],
        "agenda": [
            ("0-10", "Warm-up", "Students compare two like cases and identify whether they are being treated alike."),
            ("10-26", "Teaching", "Teacher explains scope and correction as the components that protect a system from favoritism and improvisation."),
            ("26-48", "Case comparison", "Pairs analyze one insider/outsider discrepancy and one historical revision claim."),
            ("48-68", "Repair lab", "Groups define who is bound, what counts as a misreading, and what would trigger correction."),
            ("68-84", "Whole-group challenge", "Students test whether the repair path is principled or merely convenient."),
            ("84-90", "Exit", "Students answer: how could a system confess error without collapsing?"),
        ],
        "signature": "Place two apparently similar cases on opposite sides of the room and ask the group to justify every difference in treatment aloud.",
        "teacher_moves": [
            "Keep insisting on like cases and stable criteria.",
            "Treat revision as potentially virtuous, but only when the correction method is visible and principled.",
            "Ask students what would count as a real failure for their view rather than only a misunderstood success.",
        ],
        "confusions": [
            "Students may think scope only means who is saved rather than who is morally bound.",
            "Some may interpret every change as hypocrisy; others may interpret every change as growth. Show why method matters.",
            "Others may avoid naming criteria because doing so feels too final. Encourage responsible specificity.",
        ],
        "exit_ticket": "Why is a correction method necessary if a system claims to be guided by truth already?",
        "assignment": "Write a short explanation of how your preferred route would distinguish faithful correction from ad hoc rescue.",
    },
    {
        "number": 9,
        "phase": "Phase 3 · Diagnosis and repair",
        "accent": PALETTE["blue"],
        "fill": PALETTE["blue_soft"],
        "title": "Diagnosis profiles and collapse labels",
        "rationale": "Students now need to interpret the tool's outputs without triumphalism. Diagnosis is translation, not ridicule.",
        "question": "What kind of structure is really present on the page right now, and what does the weakness currently collapse into?",
        "outcomes": [
            "Read the tool's main diagnosis profiles accurately.",
            "Explain why collapse labels are clarifying descriptions rather than insults.",
            "Use diagnosis language to direct repair instead of escalating conflict.",
        ],
        "prep": [
            "Prepare screenshots or printed outputs from several threshold results.",
            "Choose at least one example from each major diagnosis band.",
            "Write the diagnosis ladder where students can see it.",
        ],
        "materials": [
            "Diagnosis samples",
            "Collapse-label cards",
            "Highlighters",
        ],
        "agenda": [
            ("0-10", "Warm-up", "Students guess what kind of result produced a given diagnosis card."),
            ("10-26", "Teaching", "Teacher explains the ladder from conclusions without architecture to candidate moral system."),
            ("26-48", "Diagnosis gallery", "Small groups rotate through sample outputs and explain what each one means."),
            ("48-68", "Collapse translation", "Students pair a weak component with its collapse label and then state the repair question it implies."),
            ("68-84", "Language discipline", "Practice saying difficult things without insult or overclaiming."),
            ("84-90", "Exit", "Students define one diagnosis label in their own words."),
        ],
        "signature": "Create a wall gallery of printed diagnosis panels and let students annotate them with 'what this means' and 'what should happen next.'",
        "teacher_moves": [
            "Correct students who weaponize diagnosis labels too quickly.",
            "Push for calm translation: what is the view functioning like right now?",
            "Ask every group to pair a diagnosis with a repair path, not just a criticism.",
        ],
        "confusions": [
            "Students may think a diagnosis label is a final verdict on the person.",
            "Some may treat collapse labels as debate ammunition rather than architectural shorthand.",
            "Others may overuse the strongest label when a milder one is more accurate.",
        ],
        "exit_ticket": "Choose one collapse label and explain what concrete weakness it is naming.",
        "assignment": "Take one claim from your own life and predict what diagnosis it would likely receive before testing it.",
    },
    {
        "number": 10,
        "phase": "Phase 3 · Diagnosis and repair",
        "accent": PALETTE["blue"],
        "fill": PALETTE["blue_soft"],
        "title": "Readiness map, revision discipline, and repair plans",
        "rationale": "The readiness map is a compact coaching instrument. Students must learn to use it to revise the weakest lane first instead of drifting into vague generalities.",
        "question": "How do we turn a threshold result into a concrete repair plan?",
        "outcomes": [
            "Read the readiness map as a bottleneck display rather than a prestige chart.",
            "Name the next repair question for each missing or asserted lane.",
            "Practice iterating a claim without losing track of its original route and goal.",
        ],
        "prep": [
            "Prepare large printed lanes for the eight components.",
            "Choose one sample claim with a mixed pattern of missing, asserted, and substantiated statuses.",
            "Open the threshold page to the diagnosis area.",
        ],
        "materials": [
            "Readiness map poster",
            "Component lane cards",
            "Markers and sticky dots",
        ],
        "agenda": [
            ("0-10", "Warm-up", "Students predict which component lanes usually bottleneck their own preferred route."),
            ("10-24", "Teaching", "Teacher explains the map, the counts, and why effective status matters more than the clicked button alone."),
            ("24-46", "Map walk", "Students physically place component cards at missing, asserted, or substantiated for a sample claim."),
            ("46-66", "Repair planning", "Groups choose the weakest lane and write the next serious clarifying question."),
            ("66-84", "Iteration demo", "Teacher revises a claim and shows how the map changes without changing the route opportunistically."),
            ("84-90", "Exit", "Students state what makes a repair plan concrete rather than motivational."),
        ],
        "signature": "Build the readiness map on the wall and let students move component cards after each new grounding note is added.",
        "teacher_moves": [
            "Teach students to attack bottlenecks, not every weakness at once.",
            "Keep route fidelity in view: revision should strengthen the route, not quietly replace it.",
            "Whenever a student gets discouraged, point to the map as an architectural to-do list rather than a verdict.",
        ],
        "confusions": [
            "Students may see the map as a score or badge rather than a revision guide.",
            "Some may revise by changing the route instead of repairing the component.",
            "Others may treat every asserted lane as equally urgent; help them prioritize load-bearing weaknesses.",
        ],
        "exit_ticket": "Write the next best repair question for one missing or asserted component.",
        "assignment": "Revise one of your own earlier claims and bring the before/after versions.",
    },
    {
        "number": 11,
        "phase": "Phase 4 · Transfer and capstone",
        "accent": PALETTE["red"],
        "fill": PALETTE["red_soft"],
        "title": "Threshold to Stress Test and Particulars",
        "rationale": "The threshold tool is the intake gate, not the whole sequence. Students must learn what clearing threshold does and does not establish.",
        "question": "When should a claim stay at Threshold, and when should it move into the next audits?",
        "outcomes": [
            "Explain what the threshold handoff preloads into the Stress Test.",
            "Distinguish readiness from victory.",
            "Show how later tools can send a claim back here for revision.",
        ],
        "prep": [
            "Open the threshold and stress-test handoff links.",
            "Choose one claim that should move forward and one that should stay back.",
            "Prepare a short explanation of reverse handoff for revision.",
        ],
        "materials": [
            "Threshold and Stress Test pages",
            "Handoff legend",
            "Comparison worksheet",
        ],
        "agenda": [
            ("0-10", "Warm-up", "Students decide which sample claim is ready to move on and defend the choice."),
            ("10-26", "Teaching", "Teacher explains the handoff legend and why missing, asserted, and substantiated transfer differently."),
            ("26-46", "Live handoff", "Carry a real threshold result into the Stress Test and inspect what preloads."),
            ("46-66", "Return loop", "Show how a hidden assumption discovered later should send the claim back for threshold repair."),
            ("66-82", "Particulars bridge", "Preview how coherent architecture must still survive concrete cases."),
            ("82-90", "Exit", "Students answer: what does threshold success still leave unanswered?"),
        ],
        "signature": "Run a visible two-way handoff: forward into Stress Test, then back again when a pressure point is exposed.",
        "teacher_moves": [
            "Refuse the temptation to present threshold success as final proof.",
            "Model joy in revision by showing a claim return for strengthening rather than treating that return as failure.",
            "Keep the sequence visible: Threshold, Stress Test, Particulars.",
        ],
        "confusions": [
            "Students may think threshold met means debate won.",
            "Some may think later pressure invalidates the threshold tool; show that it actually fulfills it.",
            "Others may think reverse handoff is regression rather than discipline.",
        ],
        "exit_ticket": "What remains to be tested after a claim clears threshold?",
        "assignment": "Prepare your capstone claim with route, notes, likely weak lane, and a guess about readiness.",
    },
    {
        "number": 12,
        "phase": "Phase 4 · Transfer and capstone",
        "accent": PALETTE["red"],
        "fill": PALETTE["red_soft"],
        "title": "Capstone clinic and public revision",
        "rationale": "The course culminates in live threshold work. Students must demonstrate route clarity, architectural honesty, and the courage to revise in public.",
        "question": "Can I present a live moral claim, receive architectural criticism, and repair it with intellectual honesty?",
        "outcomes": [
            "Present one live moral claim and identify its route and likely bottlenecks.",
            "Respond to peer questions without hiding behind slogans.",
            "Revise at least one weak component and explain whether the claim should now move forward.",
        ],
        "prep": [
            "Collect capstone claims ahead of time and order them for pacing.",
            "Print the capstone rubric and feedback sheets.",
            "Decide whether each presentation will be live-tool or paper-based.",
        ],
        "materials": [
            "Capstone rubric",
            "Peer feedback sheets",
            "Threshold tool or printed template",
        ],
        "agenda": [
            ("0-10", "Opening covenant", "Remind the room that the goal is serious clarity, not performance humiliation."),
            ("10-70", "Presentations", "Students present claims, receive threshold questions, and revise one weak component live."),
            ("70-82", "Reflection", "Each student explains what changed and what still needs work."),
            ("82-90", "Commissioning", "Teacher names the habits students should carry into real conversations."),
        ],
        "signature": "End with a public 'I changed my mind here' moment from every participant, even if the change is small.",
        "teacher_moves": [
            "Protect the atmosphere of courage; stop mockery immediately.",
            "Keep peer feedback tied to components, routes, and repair paths.",
            "Praise the best revision in the room, not the most polished starting position.",
        ],
        "confusions": [
            "Students may present apologetic speeches instead of threshold analysis.",
            "Some may fear that revision means defeat; actively reframe that in front of the group.",
            "Others may overcorrect and collapse all confidence into uncertainty. Help them distinguish humility from confusion.",
        ],
        "exit_ticket": "What threshold habit do I most want to keep using after this course ends?",
        "assignment": "Optional: move your revised claim into the Moral System Stress Test or Moral Particulars Audit and journal what changes.",
    },
]


class PhaseStrip(Flowable):
    def __init__(self, width: float):
        super().__init__()
        self.width = width
        self.height = 104

    def draw(self) -> None:
        canvas = self.canv
        gap = 10
        card_width = (self.width - gap * 3) / 4
        for index, phase in enumerate(PHASES):
            x = index * (card_width + gap)
            y = 8
            canvas.setFillColor(phase["fill"])
            canvas.setStrokeColor(phase["accent"])
            canvas.setLineWidth(1.2)
            canvas.roundRect(x, y, card_width, 88, 12, stroke=1, fill=1)
            canvas.setFillColor(phase["accent"])
            canvas.setFont("Helvetica-Bold", 8.2)
            canvas.drawString(x + 10, y + 69, phase["label"].upper())
            canvas.setFillColor(PALETTE["ink"])
            canvas.setFont("Helvetica-Bold", 11.2)
            canvas.drawString(x + 10, y + 53, phase["title"])
            canvas.setFillColor(PALETTE["muted"])
            canvas.setFont("Helvetica-Bold", 8)
            canvas.drawString(x + 10, y + 40, f"Sessions {phase['sessions']}")
            canvas.setFont("Helvetica", 7.6)
            text = canvas.beginText(x + 10, y + 28)
            text.setLeading(9)
            for line in wrap_text(phase["copy"], 5)[:3]:
                text.textLine(line)
            canvas.drawText(text)


def wrap_text(text: str, words_per_line: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current: list[str] = []
    for word in words:
        current.append(word)
        if len(current) >= words_per_line:
            lines.append(" ".join(current))
            current = []
    if current:
        lines.append(" ".join(current))
    return lines


def styles():
    sheet = getSampleStyleSheet()
    body = ParagraphStyle(
        "Body",
        parent=sheet["BodyText"],
        fontName="Helvetica",
        fontSize=10.1,
        leading=14.6,
        textColor=PALETTE["muted"],
        spaceAfter=0,
    )
    small = ParagraphStyle(
        "Small",
        parent=body,
        fontSize=8.5,
        leading=11.1,
    )
    return {
        "kicker": ParagraphStyle(
            "Kicker",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=11,
            textColor=PALETTE["gold"],
            spaceAfter=4,
        ),
        "cover_title": ParagraphStyle(
            "CoverTitle",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=27,
            leading=31,
            textColor=PALETTE["ink"],
            spaceAfter=10,
        ),
        "cover_subtitle": ParagraphStyle(
            "CoverSubtitle",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=17,
            textColor=PALETTE["gold"],
            spaceAfter=8,
        ),
        "lead": ParagraphStyle(
            "Lead",
            parent=body,
            fontSize=12.2,
            leading=17.2,
        ),
        "section_title": ParagraphStyle(
            "SectionTitle",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=20,
            leading=23,
            textColor=PALETTE["ink"],
            spaceAfter=6,
        ),
        "body": body,
        "body_strong": ParagraphStyle(
            "BodyStrong",
            parent=body,
            fontName="Helvetica-Bold",
            textColor=PALETTE["ink"],
        ),
        "small": small,
        "small_bullet": ParagraphStyle(
            "SmallBullet",
            parent=small,
            leftIndent=0,
            spaceAfter=2,
        ),
        "card_title": ParagraphStyle(
            "CardTitle",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=11.2,
            leading=13.2,
            textColor=PALETTE["ink"],
            spaceAfter=2,
        ),
        "card_copy": ParagraphStyle(
            "CardCopy",
            parent=small,
            fontSize=8.6,
            leading=11.2,
        ),
        "table_head": ParagraphStyle(
            "TableHead",
            parent=small,
            fontName="Helvetica-Bold",
            fontSize=8.6,
            leading=10.8,
            textColor=PALETTE["ink"],
        ),
        "table_cell": ParagraphStyle(
            "TableCell",
            parent=small,
            fontSize=8.2,
            leading=10.4,
            textColor=PALETTE["muted"],
        ),
        "center_small": ParagraphStyle(
            "CenterSmall",
            parent=small,
            fontName="Helvetica-Bold",
            fontSize=8.8,
            leading=10.6,
            alignment=TA_CENTER,
            textColor=PALETTE["ink"],
        ),
        "quote": ParagraphStyle(
            "Quote",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=16.2,
            textColor=PALETTE["ink"],
            alignment=TA_CENTER,
        ),
    }


def page_background(canvas, doc) -> None:
    width, height = letter
    canvas.saveState()
    if doc.page == 1:
        canvas.setFillColor(PALETTE["paper"])
        canvas.rect(0, 0, width, height, stroke=0, fill=1)
        canvas.setFillColor(colors.HexColor("#fff0c9"))
        canvas.rect(0, height - 2.35 * inch, width, 2.35 * inch, stroke=0, fill=1)
        canvas.setFillColor(colors.HexColor("#f5dd9f"))
        canvas.circle(width - 1.0 * inch, height - 0.88 * inch, 62, stroke=0, fill=1)
        canvas.setFillColor(colors.HexColor("#eed39a"))
        canvas.circle(width - 1.2 * inch, height - 1.02 * inch, 34, stroke=0, fill=1)
    else:
        canvas.setFillColor(colors.white)
        canvas.rect(0, 0, width, height, stroke=0, fill=1)
        canvas.setStrokeColor(colors.HexColor("#efd9a7"))
        canvas.setLineWidth(2)
        canvas.line(0.75 * inch, height - 0.74 * inch, width - 0.75 * inch, height - 0.74 * inch)
        canvas.setStrokeColor(colors.HexColor("#efe6d4"))
        canvas.setLineWidth(1)
        canvas.line(0.75 * inch, 0.58 * inch, width - 0.75 * inch, 0.58 * inch)
        canvas.setFillColor(PALETTE["gold"])
        canvas.setFont("Helvetica-Bold", 8.2)
        canvas.drawString(0.78 * inch, height - 0.62 * inch, "MORAL SYSTEM THRESHOLD CURRICULUM")
        canvas.setFillColor(PALETTE["muted"])
        canvas.setFont("Helvetica", 8.2)
        canvas.drawRightString(width - 0.78 * inch, 0.38 * inch, f"Page {doc.page}")
    canvas.restoreState()


def section_heading(style_map, kicker: str, title: str, lede: str | None = None):
    items = [
        Paragraph(kicker.upper(), style_map["kicker"]),
        Paragraph(title, style_map["section_title"]),
    ]
    if lede:
        items.append(Paragraph(lede, style_map["body"]))
    return items


def flow_with_spacers(blocks: list, gap: float = 3):
    result = []
    for index, block in enumerate(blocks):
        result.append(block)
        if index != len(blocks) - 1:
            result.append(Spacer(1, gap))
    return result


def paragraph_bullets(style_map, entries: list[str], small: bool = False):
    style = style_map["small_bullet"] if small else style_map["body"]
    return [Paragraph(f"• {entry}", style) for entry in entries]


def card_block(style_map, title: str, blocks: list, accent: colors.Color, fill: colors.Color, width: float, compact: bool = False):
    flow = [Paragraph(title, style_map["card_title"]), Spacer(1, 4)]
    flow.extend(flow_with_spacers(blocks, 3))
    side_padding = 10 if compact else 12
    vertical_padding = 8 if compact else 10
    table = Table([[flow]], colWidths=[width])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), fill),
                ("BOX", (0, 0), (-1, -1), 1, accent),
                ("LINEBEFORE", (0, 0), (0, -1), 4, accent),
                ("LEFTPADDING", (0, 0), (-1, -1), side_padding),
                ("RIGHTPADDING", (0, 0), (-1, -1), side_padding),
                ("TOPPADDING", (0, 0), (-1, -1), vertical_padding),
                ("BOTTOMPADDING", (0, 0), (-1, -1), vertical_padding),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def two_column(cards: list, doc_width: float, gap: float = 10):
    rows = []
    column_width = (doc_width - gap) / 2
    for index in range(0, len(cards), 2):
        row = cards[index:index + 2]
        if len(row) < 2:
            row.append(Spacer(1, 1))
        rows.append(row)
    table = Table(rows, colWidths=[column_width, column_width])
    table.setStyle(
        TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def chip_row(style_map, chips: list[tuple[str, colors.Color, colors.Color]], width: float):
    col_width = width / len(chips)
    row = []
    for label, border, fill in chips:
        cell = Table([[Paragraph(label, style_map["center_small"])]], colWidths=[col_width - 2])
        cell.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), fill),
                    ("BOX", (0, 0), (-1, -1), 1, border),
                    ("LEFTPADDING", (0, 0), (-1, -1), 8),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                    ("TOPPADDING", (0, 0), (-1, -1), 7),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ]
            )
        )
        row.append(cell)
    table = Table([row], colWidths=[col_width] * len(chips))
    table.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0)]))
    return table


def overview_table(style_map, width: float):
    rows = [
        [
            Paragraph("<b>Session</b>", style_map["table_head"]),
            Paragraph("<b>Core focus</b>", style_map["table_head"]),
            Paragraph("<b>Concrete output</b>", style_map["table_head"]),
        ]
    ]
    for session in SESSIONS:
        rows.append(
            [
                Paragraph(f"{session['number']}. {session['title']}", style_map["table_cell"]),
                Paragraph(session["question"], style_map["table_cell"]),
                Paragraph(session["exit_ticket"], style_map["table_cell"]),
            ]
        )
    table = Table(rows, colWidths=[width * 0.29, width * 0.39, width * 0.32])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), PALETTE["gold_soft"]),
                ("GRID", (0, 0), (-1, -1), 0.8, colors.HexColor("#d6c09a")),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def schedule_table(style_map, width: float):
    rows = [
        [
            Paragraph("<b>Time</b>", style_map["table_head"]),
            Paragraph("<b>Move</b>", style_map["table_head"]),
            Paragraph("<b>Why it matters</b>", style_map["table_head"]),
        ]
    ]
    for time_slot, move, why in RECURRING_FLOW:
        rows.append(
            [
                Paragraph(time_slot, style_map["table_cell"]),
                Paragraph(move, style_map["table_cell"]),
                Paragraph(why, style_map["table_cell"]),
            ]
        )
    table = Table(rows, colWidths=[width * 0.14, width * 0.22, width * 0.64])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), PALETTE["blue_soft"]),
                ("GRID", (0, 0), (-1, -1), 0.8, colors.HexColor("#b8c8e8")),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def assessment_table(style_map, width: float):
    rows = [
        [
            Paragraph("<b>Assessment</b>", style_map["table_head"]),
            Paragraph("<b>What it reveals</b>", style_map["table_head"]),
        ]
    ]
    for name, description in ASSESSMENT_PLAN:
        rows.append([Paragraph(name, style_map["table_cell"]), Paragraph(description, style_map["table_cell"])])
    table = Table(rows, colWidths=[width * 0.26, width * 0.74])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), PALETTE["green_soft"]),
                ("GRID", (0, 0), (-1, -1), 0.8, colors.HexColor("#bed9c8")),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def session_agenda_table(style_map, agenda: list[tuple[str, str, str]], width: float, accent: colors.Color, fill: colors.Color):
    rows = [
        [
            Paragraph("<b>Time</b>", style_map["table_head"]),
            Paragraph("<b>Teacher move</b>", style_map["table_head"]),
            Paragraph("<b>Purpose</b>", style_map["table_head"]),
        ]
    ]
    for time_slot, move, purpose in agenda:
        rows.append(
            [
                Paragraph(time_slot, style_map["table_cell"]),
                Paragraph(move, style_map["table_cell"]),
                Paragraph(purpose, style_map["table_cell"]),
            ]
        )
    table = Table(rows, colWidths=[width * 0.12, width * 0.26, width * 0.62])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), fill),
                ("GRID", (0, 0), (-1, -1), 0.8, accent),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def route_table(style_map, width: float):
    rows = [
        [
            Paragraph("<b>Route family</b>", style_map["table_head"]),
            Paragraph("<b>What it includes</b>", style_map["table_head"]),
            Paragraph("<b>Main pressure</b>", style_map["table_head"]),
        ]
    ]
    for title, includes, focus in ROUTE_GROUPS:
        rows.append(
            [
                Paragraph(title, style_map["table_cell"]),
                Paragraph(includes, style_map["table_cell"]),
                Paragraph(focus, style_map["table_cell"]),
            ]
        )
    table = Table(rows, colWidths=[width * 0.2, width * 0.28, width * 0.52])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), PALETTE["gold_soft"]),
                ("GRID", (0, 0), (-1, -1), 0.8, colors.HexColor("#d6c09a")),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def component_table(style_map, width: float):
    rows = [
        [
            Paragraph("<b>Component</b>", style_map["table_head"]),
            Paragraph("<b>What the student must supply</b>", style_map["table_head"]),
            Paragraph("<b>If weak or absent</b>", style_map["table_head"]),
        ]
    ]
    for title, requirement, collapse in COMPONENTS:
        rows.append(
            [
                Paragraph(title, style_map["table_cell"]),
                Paragraph(requirement, style_map["table_cell"]),
                Paragraph(collapse, style_map["table_cell"]),
            ]
        )
    table = Table(rows, colWidths=[width * 0.2, width * 0.56, width * 0.24])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), PALETTE["blue_soft"]),
                ("GRID", (0, 0), (-1, -1), 0.8, colors.HexColor("#b8c8e8")),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def rubric_table(style_map, width: float):
    rows = [
        [
            Paragraph("<b>Criterion</b>", style_map["table_head"]),
            Paragraph("<b>What strong performance looks like</b>", style_map["table_head"]),
        ]
    ]
    for criterion, description in RUBRIC_ROWS:
        rows.append([Paragraph(criterion, style_map["table_cell"]), Paragraph(description, style_map["table_cell"])])
    table = Table(rows, colWidths=[width * 0.28, width * 0.72])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), PALETTE["red_soft"]),
                ("GRID", (0, 0), (-1, -1), 0.8, colors.HexColor("#d6a89f")),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def question_bank_table(style_map, width: float):
    rows = []
    for index in range(0, len(QUESTION_BANK), 2):
        left = QUESTION_BANK[index]
        right = QUESTION_BANK[index + 1] if index + 1 < len(QUESTION_BANK) else ""
        rows.append(
            [
                Paragraph(f"• {left}", style_map["table_cell"]),
                Paragraph(f"• {right}" if right else "", style_map["table_cell"]),
            ]
        )
    table = Table(rows, colWidths=[width / 2, width / 2])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.8, colors.HexColor("#d9d2c5")),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def build_session_page(style_map, story: list, session: dict, doc_width: float):
    story.extend(
        section_heading(
            style_map,
            f"Session {session['number']} · {session['phase']}",
            session["title"],
            session["rationale"],
        )
    )
    top_cards = [
        card_block(
            style_map,
            "Essential question",
            [Paragraph(session["question"], style_map["body"])],
            session["accent"],
            session["fill"],
            (doc_width - 10) / 2,
        ),
        card_block(
            style_map,
            "Learning outcomes",
            paragraph_bullets(style_map, session["outcomes"], small=True),
            session["accent"],
            session["fill"],
            (doc_width - 10) / 2,
        ),
    ]
    story.append(two_column(top_cards, doc_width))
    story.append(
        card_block(
            style_map,
            "Session setup",
            [Paragraph("<b>Before you teach</b>", style_map["card_copy"])]
            + paragraph_bullets(style_map, session["prep"], small=True)
            + [Paragraph("<b>Materials</b>", style_map["card_copy"])]
            + paragraph_bullets(style_map, session["materials"], small=True),
            PALETTE["slate_line"],
            PALETTE["slate"],
            doc_width,
            compact=True,
        )
    )
    story.append(session_agenda_table(style_map, session["agenda"], doc_width, session["accent"], session["fill"]))
    story.append(PageBreak())
    story.extend(
        section_heading(
            style_map,
            f"Session {session['number']} notes",
            "Facilitation notes and close",
            "Use this page while the room is active: it holds the creative exercise, the teacher instincts to keep repeating, the likely confusions, and the final closing move.",
        )
    )
    bottom_cards = [
        card_block(
            style_map,
            "Facilitation notes",
            [Paragraph(f"<b>Signature exercise:</b> {session['signature']}", style_map["card_copy"])]
            + paragraph_bullets(style_map, session["teacher_moves"], small=True),
            session["accent"],
            session["fill"],
            (doc_width - 10) / 2,
            compact=True,
        ),
        card_block(
            style_map,
            "Watch-fors and close",
            [Paragraph("<b>Common confusions:</b>", style_map["card_copy"])]
            + paragraph_bullets(style_map, session["confusions"], small=True)
            + [
                Paragraph(f"<b>Exit ticket:</b> {session['exit_ticket']}", style_map["card_copy"]),
                Paragraph(f"<b>Assignment:</b> {session['assignment']}", style_map["card_copy"]),
            ],
            PALETTE["blue"],
            PALETTE["blue_soft"],
            (doc_width - 10) / 2,
            compact=True,
        ),
    ]
    story.append(two_column(bottom_cards, doc_width))
    story.append(
        card_block(
            style_map,
            "Threshold payoff for this week",
            [Paragraph(SESSION_PAYOFFS[session["number"]], style_map["body"])],
            session["accent"],
            session["fill"],
            doc_width,
            compact=True,
        )
    )
    story.append(PageBreak())


def build_story(doc_width: float):
    s = styles()
    story = []

    story.extend(
        section_heading(
            s,
            "Curriculum",
            "Moral System Threshold",
            "A full-fledged small-group curriculum for young, honest seekers who want to learn how to examine alleged moral systems with charity, rigor, and intellectual courage.",
        )
    )
    story.append(Paragraph("This curriculum trains students to distinguish a moral source from a moral system, to identify the eight threshold components of coherence, and to revise weak claims without panic or performance.", s["cover_subtitle"]))
    story.append(Spacer(1, 8))
    story.append(
        chip_row(
            s,
            [
                ("12 sessions", PALETTE["gold"], PALETTE["gold_soft"]),
                ("90 minutes each", PALETTE["blue"], PALETTE["blue_soft"]),
                ("Small-group, discussion heavy", PALETTE["green"], PALETTE["green_soft"]),
                ("Threshold -> Stress Test -> Particulars", PALETTE["red"], PALETTE["red_soft"]),
            ],
            doc_width,
        )
    )
    story.append(Spacer(1, 14))
    story.append(
        card_block(
            s,
            "Program promise",
            [Paragraph("By the end, participants should be able to name a live moral claim, identify its route, assess all eight threshold components, explain the collapse risks, repair weak components, and judge whether the claim is ready to move into the advanced morality tools.", s["lead"])],
            PALETTE["gold"],
            PALETTE["gold_soft"],
            doc_width,
        )
    )
    story.append(Spacer(1, 14))
    cover_cards = [
        card_block(
            s,
            "Best for",
            [Paragraph("Older teens, university-age students, and early adult seekers who are sincere, thoughtful, and ready to be challenged without being shamed.", s["card_copy"])],
            PALETTE["blue"],
            PALETTE["blue_soft"],
            (doc_width - 10) / 2,
        ),
        card_block(
            s,
            "Teacher profile",
            [Paragraph("A dynamic and creative teacher who likes live demos, role-play, whiteboard thinking, and public revision will make this curriculum come alive.", s["card_copy"])],
            PALETTE["red"],
            PALETTE["red_soft"],
            (doc_width - 10) / 2,
        ),
    ]
    story.append(two_column(cover_cards, doc_width))
    story.append(
        card_block(
            s,
            "The six course-level outcomes",
            paragraph_bullets(s, PROGRAM_OUTCOMES, small=False),
            PALETTE["green"],
            PALETTE["green_soft"],
            doc_width,
            compact=True,
        )
    )
    story.append(PageBreak())

    story.extend(
        section_heading(
            s,
            "Overview",
            "How the curriculum is meant to move",
            "The sequence moves from distinctions, to architecture, to diagnosis, to transfer. The teacher should keep that arc visible every week rather than letting the group treat each session as a disconnected topic.",
        )
    )
    story.append(PhaseStrip(doc_width))
    story.append(Spacer(1, 12))
    overview_cards = [
        card_block(
            s,
            "How to use the sequence",
            paragraph_bullets(s, OVERVIEW_NOTES, small=True),
            PALETTE["blue"],
            PALETTE["blue_soft"],
            doc_width,
            compact=True,
        )
    ]
    story.extend(overview_cards)
    story.append(PageBreak())
    story.extend(
        section_heading(
            s,
            "Sequence map",
            "Twelve sessions in one view",
            "Use this table for early planning, mid-course recalibration, and final capstone review.",
        )
    )
    story.append(overview_table(s, doc_width))
    story.append(PageBreak())

    story.extend(
        section_heading(
            s,
            "Teacher setup",
            "The posture, room, and rhythm matter",
            "This curriculum is rigorous, but it should not feel combative. The environment must reward honesty, slowed-down thinking, and public repair.",
        )
    )
    teacher_cards = [
        card_block(
            s,
            "Discussion covenant",
            paragraph_bullets(s, DISCUSSION_COVENANT, small=True),
            PALETTE["gold"],
            PALETTE["gold_soft"],
            (doc_width - 10) / 2,
        ),
        card_block(
            s,
            "Recommended room setup",
            paragraph_bullets(
                s,
                [
                    "Circle or horseshoe seating so students can see each other think.",
                    "One visible board or projected screen running the tool.",
                    "Physical space for corners, continuums, or wall maps.",
                    "Printed cards and markers available every week.",
                ],
                small=True,
            ),
            PALETTE["blue"],
            PALETTE["blue_soft"],
            (doc_width - 10) / 2,
        ),
        card_block(
            s,
            "Teacher mantras",
            paragraph_bullets(
                s,
                [
                    "What is doing the work here?",
                    "What still has to be supplied?",
                    "Can an accountable outsider test this?",
                    "Are we repairing the system or protecting the answer?",
                ],
                small=True,
            ),
            PALETTE["green"],
            PALETTE["green_soft"],
            (doc_width - 10) / 2,
        ),
        card_block(
            s,
            "Creative options to keep energy high",
            paragraph_bullets(
                s,
                [
                    "Floor continuums and room corners",
                    "Whiteboard architecture maps",
                    "Role-play between sincere interpreters",
                    "Claim clinics and public revisions",
                ],
                small=True,
            ),
            PALETTE["red"],
            PALETTE["red_soft"],
            (doc_width - 10) / 2,
        ),
    ]
    story.append(two_column(teacher_cards, doc_width))
    story.append(schedule_table(s, doc_width))
    story.append(PageBreak())

    story.extend(
        section_heading(
            s,
            "Assessment",
            "Assessment, delivery, and materials",
            "The best evidence of growth is not louder certainty. It is cleaner distinctions, better grounding notes, calmer revision, and stronger transfer judgment.",
        )
    )
    story.append(assessment_table(s, doc_width))
    story.append(Spacer(1, 12))
    assessment_cards = [
        card_block(
            s,
            "What to listen for",
            paragraph_bullets(
                s,
                [
                    "Does the student confuse a source with a system?",
                    "Does the student rate too generously?",
                    "Can the student explain why a collapse label appears?",
                    "Can the student propose a repair path instead of stopping at criticism?",
                ],
                small=True,
            ),
            PALETTE["blue"],
            PALETTE["blue_soft"],
            (doc_width - 10) / 2,
        ),
        card_block(
            s,
            "Capstone standard",
            [Paragraph("A successful capstone presentation is not the one with the fewest weaknesses. It is the one that names the route clearly, rates the components honestly, welcomes pressure, and revises at least one weak lane in public.", s["card_copy"])],
            PALETTE["red"],
            PALETTE["red_soft"],
            (doc_width - 10) / 2,
        ),
    ]
    story.append(two_column(assessment_cards, doc_width))
    variant_cards = [
        card_block(
            s,
            title,
            [Paragraph(copy, s["card_copy"])],
            accent,
            fill,
            (doc_width - 10) / 2,
            compact=True,
        )
        for title, copy, accent, fill in DELIVERY_VARIANTS
    ]
    story.append(two_column(variant_cards, doc_width))
    story.append(
        card_block(
            s,
            "Material kit to prepare before launch",
            paragraph_bullets(s, RESOURCE_KIT, small=True),
            PALETTE["gold"],
            PALETTE["gold_soft"],
            doc_width,
            compact=True,
        )
    )
    story.append(PageBreak())

    for session in SESSIONS:
        build_session_page(s, story, session, doc_width)

    story.extend(
        section_heading(
            s,
            "Appendix A",
            "Route and component cheat sheets",
            "These tables let the teacher keep the whole logic of the tool visible while the weekly lessons zoom in on smaller questions.",
        )
    )
    story.append(route_table(s, doc_width))
    story.append(Spacer(1, 12))
    story.append(component_table(s, doc_width))
    story.append(PageBreak())

    story.extend(
        section_heading(
            s,
            "Appendix B",
            "Capstone rubric and question bank",
            "The rubric should keep the final session honest, while the question bank keeps the teacher supplied with threshold-style prompts all term.",
        )
    )
    story.append(rubric_table(s, doc_width))
    story.append(Spacer(1, 12))
    story.append(
        card_block(
            s,
            "Reusable threshold questions",
            [question_bank_table(s, doc_width - 24)],
            PALETTE["gold"],
            PALETTE["gold_soft"],
            doc_width,
        )
    )
    return story


def build_pdf(output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    margin = 0.78 * inch
    doc = SimpleDocTemplate(
        str(output),
        pagesize=letter,
        leftMargin=margin,
        rightMargin=margin,
        topMargin=1.24 * inch,
        bottomMargin=0.78 * inch,
        pageCompression=0,
        title="Moral System Threshold Curriculum",
        author="Phil Stilwell",
        subject="Small-group curriculum for teaching the Moral System Threshold tool",
    )
    story = build_story(doc.width)
    doc.build(story, onFirstPage=page_background, onLaterPages=page_background)


if __name__ == "__main__":
    build_pdf(OUTPUT)

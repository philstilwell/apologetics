from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    HRFlowable,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "assets" / "manuals" / "belief-overreach-audit-curriculum.pdf"

PALETTE = {
    "ink": colors.HexColor("#20140c"),
    "muted": colors.HexColor("#5c4a3d"),
    "paper": colors.HexColor("#fff9f1"),
    "sand": colors.HexColor("#f4e6cf"),
    "line": colors.HexColor("#dccdb8"),
    "green": colors.HexColor("#327a4d"),
    "blue": colors.HexColor("#275f9d"),
    "amber": colors.HexColor("#be7a18"),
    "red": colors.HexColor("#af4638"),
    "brown": colors.HexColor("#724819"),
    "teal": colors.HexColor("#275f65"),
    "plum": colors.HexColor("#6b4f7a"),
    "soft_green": colors.HexColor("#e8f1e8"),
    "soft_blue": colors.HexColor("#e7eef8"),
    "soft_amber": colors.HexColor("#fbf0df"),
    "soft_red": colors.HexColor("#f8e7e4"),
    "soft_brown": colors.HexColor("#f4ece0"),
    "soft_plum": colors.HexColor("#efe8f4"),
    "soft_gold": colors.HexColor("#fff4d8"),
}


SESSIONS = [
    {
        "number": 1,
        "title": "Honest Belief and the Course Frame",
        "accent": "green",
        "purpose": "Introduce the group, define the course target, and establish the key contrast between sincere belief and evidence-capped belief.",
        "big_question": "What makes a belief honest rather than merely heartfelt?",
        "outcomes": [
            "Participants can define faith, perceived support, and core rationality in the course's own terms.",
            "Participants understand that the course examines methods of believing rather than attacking people.",
            "Participants help create discussion norms that protect honesty, symmetry, and emotional safety.",
        ],
        "prep": [
            "Open the Belief Overreach Audit on a large screen.",
            "Print name cards, reflection sheets, and the course vocabulary page.",
            "Prepare a wall line labeled low support to high support for the opening exercise.",
        ],
        "agenda": [
            ("10 min", "Welcome and norms", "Set the emotional tone and make the inquiry feel safe."),
            ("15 min", "Confidence line warm-up", "Sort everyday claims by how much support they seem to have."),
            ("20 min", "Mini-lesson", "Define faith as confidence above perceived evidence."),
            ("20 min", "Pair work", "Compare sincerity, trust, hope, and evidence using short cases."),
            ("15 min", "Whole-group debrief", "Surface confusions before the course moves into simulations."),
            ("10 min", "Private reflection", "Write where confidence in your own life may already outrun support."),
        ],
        "activities": [
            "Use simple claims first, such as a friend will text back, a team will win, or a rumor is true, so participants feel the structure before religion is even mentioned.",
            "Ask students to move physically on the support line, then explain not only where they stood but why they stood there.",
            "Show the tool's top definition panel and connect its vocabulary to the exercise they just completed.",
        ],
        "debrief": [
            "What is the difference between feeling certain and being warranted?",
            "Why might a person be completely sincere and still be over-believing?",
            "Why is the course focused on methods rather than motives alone?",
        ],
        "listen_for": [
            "Students begin distinguishing sincerity from warrant without treating sincerity as fake.",
            "Participants can say in their own words why the course is about methods rather than tribes.",
            "The room starts using support and pull as different categories rather than as synonyms.",
        ],
        "adaptation": [
            "If the room is guarded, keep the first cases ordinary and low-stakes for longer.",
            "If discussion becomes abstract too quickly, return to the wall-line exercise and ask for concrete examples.",
            "If religion dominates too early, postpone it and restate that the course will earn that transition later.",
        ],
        "homework": "Write one page on three beliefs you hold strongly. For each, separate what actually supports it from what merely pulls you toward it.",
        "teacher_note": "Your first job is to lower defensiveness. Keep reminding the group that the course does not punish uncertainty. It asks whether a method of believing deserves trust.",
        "hazard": "The main risk is premature argument about religion. Keep the first session anchored in ordinary claims so the method comes first.",
    },
    {
        "number": 2,
        "title": "Uncertainty, Risk, and Overreach",
        "accent": "blue",
        "purpose": "Show that acting under uncertainty is not the problem; the problem is adding commitment beyond what the evidence warrants.",
        "big_question": "How can we act without pretending to know more than we know?",
        "outcomes": [
            "Participants can distinguish reasonable action under uncertainty from overconfident action.",
            "Participants can explain why confidence does not change reality.",
            "Participants begin seeing why luck and truth-tracking are different ideas.",
        ],
        "prep": [
            "Prepare a short card or die-based game for the opening drill.",
            "Have a visible whiteboard ready for expected outcome versus chosen confidence.",
            "Cue the tool to the calibration section if you want to connect to its opening screens.",
        ],
        "agenda": [
            ("10 min", "Recap and check-in", "Reinforce the previous session's vocabulary."),
            ("20 min", "Risk game", "Make confident predictions and score them against actual odds."),
            ("15 min", "Concept frame", "Name the difference between uncertainty and overreach."),
            ("20 min", "Small-group cases", "Ask whether each action is cautious, rational, or overcommitted."),
            ("15 min", "Luck discussion", "Separate one-off wins from the quality of the method."),
            ("10 min", "Exit writing", "Complete the sentence: uncertainty is not the enemy because..."),
        ],
        "activities": [
            "Have students assign confidence percentages before each reveal, then score how often the percentages outran what the setup justified.",
            "Use a few examples where the bold move happened to work so they feel how seductive bad methods can be.",
            "End by asking whether a lucky outcome proves the method was good.",
        ],
        "debrief": [
            "Can a bad method occasionally produce a good result?",
            "Why is waiting for better evidence different from refusing to act altogether?",
            "Where do people most often confuse courage with overconfidence?",
        ],
        "listen_for": [
            "Students can say uncertainty is normal without collapsing into passivity.",
            "Participants stop treating a lucky outcome as automatic proof of a good method.",
            "The phrase act under uncertainty starts sounding different from pretend to know.",
        ],
        "adaptation": [
            "If percentages intimidate the group, drop the numbers and talk in rough confidence bands instead.",
            "If the room treats caution as weakness, use one example where restraint clearly preserves options.",
            "If time is tight, cut the small-group cases and keep the luck discussion plus exit writing.",
        ],
        "homework": "Find one real-world example where people praised confidence more than evidence. Bring a short description to the next meeting.",
        "teacher_note": "Young seekers often fear that this framework requires paralysis. Keep saying that rational restraint is not passivity; it is disciplined proportion.",
        "hazard": "Do not let percentages become the point. The point is calibration, not mathematical performance art.",
    },
    {
        "number": 3,
        "title": "Gambling: The Clean Case",
        "accent": "amber",
        "purpose": "Use the tool's gambling scenario to make the danger of faith in the course's sense vivid and hard to evade.",
        "big_question": "Why does feeling lucky not count as evidence?",
        "outcomes": [
            "Participants can read the gambling scenario from left to right without help.",
            "Participants can explain why all four gamblers face the same sampled event stream.",
            "Participants can see that faith changes the quality of the bet rather than magically improving the cards.",
        ],
        "prep": [
            "Open the tool to the Gambling field and reset the run before class begins.",
            "Print a one-page reading guide that labels the scenario cards, event card, and graph.",
            "Prepare one short explanation of the house rule in plain language.",
        ],
        "agenda": [
            ("10 min", "Tool tour", "Orient the group to the field tabs, event stats, and four agents."),
            ("20 min", "Live simulation run", "Advance multiple tries and narrate what changes each time."),
            ("20 min", "Reading practice", "Have students explain a specific try in pairs."),
            ("20 min", "Method audit", "Ask what exactly Ada avoids that Zeke does not."),
            ("10 min", "Short reset run", "Show that random runs differ but the same long-run pattern remains."),
            ("10 min", "Reflection", "Write why luck does not rescue a worse betting rule."),
        ],
        "activities": [
            "Pause after a lucky Zeke spike and ask the room whether his method improved or merely got lucky.",
            "Highlight the difference between banking a paying hand and chasing one more card because of a hot-hand feeling.",
            "Run two fresh resets so participants experience randomness directly instead of hearing about it abstractly.",
        ],
        "debrief": [
            "What would it mean to read the table honestly?",
            "How does the graph keep one dramatic try from controlling the whole story?",
            "Why is gambling the easiest domain in which to spot overreach?",
        ],
        "listen_for": [
            "Students can explain why the same event stream matters for comparing methods fairly.",
            "The group notices that faith changes the decision rule, not the underlying odds.",
            "Participants begin using short-term win and long-run method as separate ideas.",
        ],
        "adaptation": [
            "If the room gets lost in rules, simplify the house rule to bank a good hand, do not chase because you feel lucky.",
            "If a Zeke win confuses the group, run a second reset immediately and compare the graphs.",
            "If students want more agency, pause before each try and make them predict each agent's move first.",
        ],
        "homework": "Write a paragraph that begins, a short win does not justify the method because...",
        "teacher_note": "This is the moment to make the course feel concrete. The cleaner the explanation here, the easier the later transfer to religion becomes.",
        "hazard": "Avoid turning the session into casino trivia. Keep all attention on method, not gaming lore.",
    },
    {
        "number": 4,
        "title": "Investment: Story, Hype, and Due Diligence",
        "accent": "amber",
        "purpose": "Move from clean gambling odds to messier adult judgments where buzz and narrative can impersonate evidence.",
        "big_question": "When does excitement start doing the work that evidence should do?",
        "outcomes": [
            "Participants can explain the roles of fundamentals, buzz, and actual move in the investment scenario.",
            "Participants can identify why faith-heavy investors may surge briefly yet still lose on method over time.",
            "Participants can name the emotional appeal of conviction without mistaking it for warrant.",
        ],
        "prep": [
            "Reset the Investment scenario and note one or two runs where Willa or Zeke lead briefly.",
            "Prepare two toy company profiles: one fundamentally strong and one hype-heavy.",
            "Have sticky notes ready so the group can sort evidence versus buzz signals.",
        ],
        "agenda": [
            ("10 min", "Bridge from gambling", "Name what becomes murkier when the world looks more realistic."),
            ("20 min", "Scenario run", "Advance several investment rounds and narrate the graph."),
            ("20 min", "Signal sorting", "Classify concrete company signals as fundamentals, buzz, both, or neither."),
            ("20 min", "Pitch challenge", "Students hear two mini stock pitches and identify where overreach enters."),
            ("10 min", "Long-run lens", "Compare a short winning streak to the cumulative line."),
            ("10 min", "Journal", "Describe a time hype made a claim feel stronger than it was."),
        ],
        "activities": [
            "Show that a hype stock can rise sharply, then ask whether that means the investor had good grounds before the rise.",
            "Use the tool's note that the runs are pseudo-random to reinforce that some dramatic runs will favor the wrong method for a while.",
            "Invite students to rephrase business buzz in plainer English so the seduction becomes easier to hear.",
        ],
        "debrief": [
            "Why do grown-up settings make overreach sound respectable?",
            "What is the difference between conviction and disciplined due diligence?",
            "Why should truth not need us to add excitement where support is weak?",
        ],
        "listen_for": [
            "Students can separate business substance from business atmosphere.",
            "The group sees why hype can feel intelligent while still being evidentially thin.",
            "Participants can explain why brief market gains do not retroactively create prior support.",
        ],
        "adaptation": [
            "If students are financially inexperienced, translate the lesson into trend-chasing, virality, or status buying.",
            "If the room becomes cynical about all confidence, bring back the difference between confidence with support and confidence without it.",
            "If discussion drifts, return to the tool graph and ask which line is consistently easiest to trust and why.",
        ],
        "homework": "Find one public claim in finance, culture, or politics that is being sold with narrative force. Split the signals into support and pull.",
        "teacher_note": "Students often admire confidence in this domain. Let them feel why confidence can be socially rewarded and still be epistemically weak.",
        "hazard": "Do not imply that risk itself is irrational. The target is risk taken on support that the person does not really have.",
    },
    {
        "number": 5,
        "title": "Romance: Chemistry, Vetting, and False Signals",
        "accent": "plum",
        "purpose": "Teach the same structure in a more vulnerable domain where the costs are emotional, social, and personal rather than merely financial.",
        "big_question": "What happens when longing starts counting as proof?",
        "outcomes": [
            "Participants can explain why chemistry is real but not self-validating.",
            "Participants can identify the role of vetting, character, and verification in the romance scenario.",
            "Participants can describe why the catfish example is not just a dramatic outlier but a vivid case of overreach.",
        ],
        "prep": [
            "Reset the Romance scenario.",
            "Prepare short prompt cards on spark, trust, jealousy, loneliness, and exclusivity.",
            "Remind yourself to keep the tone respectful and never push participants to disclose private experiences.",
        ],
        "agenda": [
            ("10 min", "Context setting", "Acknowledge that romance feels more personal than gambling or investing."),
            ("20 min", "Scenario run", "Walk through several tries and pause at a strong emotional pull moment."),
            ("20 min", "Signal cards", "Sort spark, history, verification, urgency, and consistency into support or pull."),
            ("20 min", "Case reflection", "Use the catfish-style try to discuss remote trust without vetting."),
            ("10 min", "Protective principles", "Name what evidence-capped care looks like in relationships."),
            ("10 min", "Private writing", "What might a careful heart do that a faith-driven heart skips?"),
        ],
        "activities": [
            "Use paired discussion rather than whole-room confession. The point is method, not exposure.",
            "Ask students to compare being open to love with surrendering judgment.",
            "Keep bringing them back to the tool's central move: all four agents face the same encounter, but not all of them translate pull into commitment.",
        ],
        "debrief": [
            "What does healthy caution preserve that overcommitment can spend too quickly?",
            "Why do people romanticize riskier methods in this domain?",
            "How can waiting be an act of respect rather than coldness?",
        ],
        "listen_for": [
            "Students begin distinguishing emotional intensity from evidence of trustworthiness.",
            "Participants can say why vetting is not the enemy of love.",
            "The room starts describing overcommitment as costly even when it feels romantic.",
        ],
        "adaptation": [
            "If the room gets shy, keep everything on fictional or tool-based cases instead of personal disclosure.",
            "If students drift toward cynicism, ask what wise patience preserves rather than what romance forbids.",
            "If a catfish example feels too dramatic, use a softer case about exclusivity outrunning character evidence.",
        ],
        "homework": "Create a two-column list: signs of real trustworthiness versus signs that merely feel intense.",
        "teacher_note": "This session needs a gentler pace. Young seekers may suddenly realize the framework speaks directly to wounds, fantasies, or fears they carry.",
        "hazard": "Never reward cynicism. The rational line is not anti-love; it is anti-overreach.",
    },
    {
        "number": 6,
        "title": "Religion: Evidence, Pull, and Demand",
        "accent": "red",
        "purpose": "Transfer the exact same structure into religion while keeping the standards symmetrical with the earlier domains.",
        "big_question": "Why should religion not receive a special exemption from ordinary epistemic standards?",
        "outcomes": [
            "Participants can explain the religion scenario's three event tags: evidence, pull, and demand.",
            "Participants can see how beauty, belonging, fear, guilt, urgency, and inheritance may raise pull without raising support.",
            "Participants can identify how costly religious overreach can become once life-direction enters the picture.",
        ],
        "prep": [
            "Reset the Religion scenario and identify one try with high pull and high demand but weak evidence.",
            "Print the tool's definitions so students can keep the language in front of them.",
            "Prepare a reminder that some communities use the word faith differently, and that the course is targeting a specific definition.",
        ],
        "agenda": [
            ("10 min", "Framing", "State that the same standards used in earlier fields will be used here too."),
            ("20 min", "Scenario run", "Advance multiple tries and narrate evidence, pull, and demand carefully."),
            ("20 min", "Language audit", "Translate words like surrender, calling, trust, obedience, and witness into plainer decision language."),
            ("20 min", "Demand ladder", "Ask what a claim is asking the agent to spend in each try."),
            ("10 min", "Quiet reflection", "Where might noble language hide overreach?"),
            ("10 min", "Debrief", "Hold the room steady and symmetrical."),
        ],
        "activities": [
            "Pause when the demand is high and ask what has actually risen with it: evidence or only emotional and social force.",
            "Use the tooltips on evidence, pull, and demand so students can read the event card independently.",
            "Invite the group to compare religious pull with romantic chemistry and investment hype without cheapening any of them.",
        ],
        "debrief": [
            "Why does religion often feel harder to examine with ordinary standards?",
            "What makes belonging powerful without making it evidence by itself?",
            "If a claim is true, why should it need us to add belief beyond support?",
        ],
        "listen_for": [
            "Students can explain evidence, pull, and demand without using them interchangeably.",
            "The group begins seeing that noble language can still hide costly overreach.",
            "Participants notice that the religion case is structurally continuous with the earlier fields rather than isolated from them.",
        ],
        "adaptation": [
            "If the room becomes defensive, slow the pace and return to symmetry instead of pressing harder.",
            "If the term faith becomes contested, restate the course definition and acknowledge that some communities use the word more narrowly.",
            "If religion feels too abstract, ask what the claim is demanding in hours, identity, money, or obedience right now.",
        ],
        "homework": "Write two short paragraphs: what draws people toward a claim, and what actually supports that claim.",
        "teacher_note": "The room may become tense here. Slow down. Reward candor and careful wording more than speed or rhetorical force.",
        "hazard": "Do not slide into tribal dunking. The course is strongest when it shows symmetry, not contempt.",
    },
    {
        "number": 7,
        "title": "Hope, Community, and the Psychology of Faith",
        "accent": "teal",
        "purpose": "Explain why faith in the course's sense is attractive, so the critique does not remain shallow or dismissive.",
        "big_question": "What inner and social pressures make over-belief feel noble or necessary?",
        "outcomes": [
            "Participants can identify hope, fear, belonging, guilt, beauty, and authority as forces that can intensify belief without becoming support.",
            "Participants can explain why emotionally helpful beliefs may still be epistemically poor.",
            "Participants can describe how communities can normalize overreach without naming it as such.",
        ],
        "prep": [
            "Bring a visible chart with the headings support and pull.",
            "Prepare six pressure cards: hope, fear, belonging, beauty, guilt, authority.",
            "Select one religion scenario and one romance scenario to compare side by side.",
        ],
        "agenda": [
            ("10 min", "Review", "Revisit the previous session's language."),
            ("20 min", "Pressure mapping", "Place different psychological and social forces under support or pull."),
            ("20 min", "Cross-domain comparison", "Compare how pull operates in religion and romance."),
            ("20 min", "Small-group discussion", "Ask what communities reward when they praise faith."),
            ("10 min", "Teacher synthesis", "Explain why motives can be understandable yet still methodologically weak."),
            ("10 min", "Reflection", "Where do I fear the social cost of lowering confidence?"),
        ],
        "activities": [
            "Have students physically move cards on a board so the classification feels concrete.",
            "Stress that a force can be emotionally deep without being evidence.",
            "Use the tool's wording about life-budget to show that the cost is not only money but time, identity, and obedience.",
        ],
        "debrief": [
            "Why do people often confuse being moved with being warranted?",
            "How can a community reward confidence more than honesty?",
            "What makes hope powerful, and why is that different from making it proof?",
        ],
        "listen_for": [
            "Students can name psychological and social pressures without treating them as proof.",
            "Participants speak more compassionately about why people over-believe.",
            "The room can now criticize a method without pretending the emotional pull was never real.",
        ],
        "adaptation": [
            "If the room sounds cold, explicitly affirm that hope, beauty, and belonging matter humanly even when they do not count as evidence.",
            "If students reduce everything to psychology, bring them back to the epistemic question of what warrants belief.",
            "If energy dips, use a quick sort activity with the pressure cards to re-embody the concept.",
        ],
        "homework": "Private journal only: where would lowering confidence feel costly in your own social world?",
        "teacher_note": "This session humanizes the problem. If it is taught well, students stop assuming that irrationality always looks foolish from the inside.",
        "hazard": "Do not imply that emotions are enemies. The point is that emotions are real data about us, not automatic proof about the claim.",
    },
    {
        "number": 8,
        "title": "Objections, Steelmanning, and Symmetry",
        "accent": "blue",
        "purpose": "Train students to face the strongest objections fairly, so the framework becomes more resilient and less slogan-like.",
        "big_question": "What should a good critic of this course say, and how should we answer?",
        "outcomes": [
            "Participants can state the best version of at least four major objections.",
            "Participants can answer those objections without caricature.",
            "Participants internalize the standard that no favored claim receives a special pass.",
        ],
        "prep": [
            "Prepare objection cards such as everyone needs faith, waiting means missing out, and trust always requires a leap.",
            "Set up four stations around the room, one for each objection cluster.",
            "Bring a rubric that rewards charitable summary before rebuttal.",
        ],
        "agenda": [
            ("10 min", "Standard setting", "Explain steelmanning and symmetry."),
            ("25 min", "Objection stations", "Small groups rotate through the best criticisms they can formulate."),
            ("20 min", "Reply building", "Groups craft plain-language replies grounded in the course framework."),
            ("20 min", "Whole-group comparison", "Ask which objections still feel strongest and why."),
            ("10 min", "Teacher clarification", "Tighten distinctions where the class is still blurry."),
            ("5 min", "Exit ticket", "One objection I can now answer better is..."),
        ],
        "activities": [
            "Reward students who improve the objection rather than weaken it.",
            "Keep the replies practical and plain. The goal is not ornate philosophy but honest reasoning.",
            "Use at least one objection that genuinely still has emotional force for the group.",
        ],
        "debrief": [
            "Which objection remains most tempting and why?",
            "What counts as a genuine reply rather than a rhetorical dodge?",
            "How do we know when we are giving religion a special exemption?",
        ],
        "listen_for": [
            "Students summarize objections more fairly than they would have at the start of the course.",
            "The room distinguishes a live objection from a slogan or a dodge.",
            "Participants start noticing where they instinctively want a special exemption for favored beliefs.",
        ],
        "adaptation": [
            "If the objections get weak, pause and ask the class to strengthen them before answering.",
            "If students get competitive, switch from debate language to clarification language.",
            "If one objection dominates, use it as the class focal point and trim the station rotation.",
        ],
        "homework": "Write a one-page answer to the strongest objection you still feel, and include where that objection still has force.",
        "teacher_note": "A course becomes credible when it can survive its best criticism. Slow the group down until they can state objections in language their critics would actually recognize.",
        "hazard": "Do not let answer-making become smug. The best answer often still leaves residue and tension.",
    },
    {
        "number": 9,
        "title": "Personal Audit Without Coercion",
        "accent": "green",
        "purpose": "Help participants use the framework on themselves without turning the room into a pressure chamber or a confessional performance.",
        "big_question": "How can I examine my own beliefs honestly without punishing myself for uncertainty?",
        "outcomes": [
            "Participants can privately map beliefs, support, pull, and cost.",
            "Participants can imagine what it would mean to lower confidence without feeling like they are betraying truth.",
            "Participants learn a method for honest self-audit they can keep after the course ends.",
        ],
        "prep": [
            "Prepare private worksheets with columns for claim, support, pull, current confidence, and practical cost.",
            "Make it explicit that students may keep their sheets private.",
            "Create a calm room setup with extra writing time and less public discussion than usual.",
        ],
        "agenda": [
            ("10 min", "Safety frame", "Clarify that no one is required to disclose conclusions."),
            ("25 min", "Personal audit worksheet", "Students work silently on beliefs that matter to them."),
            ("15 min", "Optional pair share", "Discuss process rather than content, unless volunteers choose otherwise."),
            ("20 min", "Method coaching", "Show how to revisit a belief without panic or false urgency."),
            ("10 min", "Short teaching", "Explain that lowering confidence can be a form of integrity."),
            ("10 min", "Exit reflection", "What would honest recalibration look like for me?"),
        ],
        "activities": [
            "Encourage participants to pick one low-stakes and one high-stakes belief so they can compare their own emotional reactions.",
            "Model how a person can say I do not know yet without collapsing into apathy.",
            "Offer a few examples from ordinary life before anyone applies the tool to a deeply personal religious claim.",
        ],
        "debrief": [
            "What made the self-audit feel difficult?",
            "What social or emotional costs make recalibration hard?",
            "Why is uncertainty often healthier than inflated certainty?",
        ],
        "listen_for": [
            "Students begin talking about recalibration as integrity rather than as betrayal.",
            "The room can describe social costs without turning those costs into evidence.",
            "Participants can imagine lowering confidence without losing the will to keep seeking truth.",
        ],
        "adaptation": [
            "If the room is anxious, offer one low-stakes practice claim before asking for a personal one.",
            "If people want to disclose more than is healthy, thank them and redirect toward process rather than biography.",
            "If students freeze, let them work with a fictional belief holder first and then transfer privately.",
        ],
        "homework": "Draft a personal method statement: when I care deeply, how will I stop pull from pretending to be evidence?",
        "teacher_note": "This session should feel humane. Students need to experience the framework as liberatingly honest, not emotionally punitive.",
        "hazard": "Never pressure disclosure. Forced transparency would violate the course's own respect for epistemic honesty.",
    },
    {
        "number": 10,
        "title": "Capstone, Integration, and Next Steps",
        "accent": "brown",
        "purpose": "Consolidate the full curriculum into a durable framework the group can explain, apply, and carry forward.",
        "big_question": "What does a truth-seeking life look like after this course?",
        "outcomes": [
            "Participants can explain the course thesis in plain language.",
            "Participants can compare domains without changing standards midstream.",
            "Participants can produce a capstone reflection, presentation, or brief analysis using the course framework.",
        ],
        "prep": [
            "Choose the capstone format before the session: short presentation, written reflection, paired dialogue, or case analysis.",
            "Reset the tool so the course can end with one final clean run.",
            "Print the final rubric and the course glossary.",
        ],
        "agenda": [
            ("10 min", "Course review", "Revisit the core definitions and the four domains."),
            ("25 min", "Capstone share", "Students present or summarize their final work."),
            ("15 min", "Final tool run", "Watch one fresh simulation with the whole course now in view."),
            ("20 min", "Integration dialogue", "Ask what participants now see that they could not see on day one."),
            ("10 min", "Forward plan", "Invite students to state one epistemic practice they want to keep."),
            ("10 min", "Closing reflection", "Write a letter to your future self about honest belief."),
        ],
        "activities": [
            "Use the final run of the tool not as proof theater but as a concrete recap of the course's method.",
            "Ask students to compare how they would have read the same graph on session three versus now.",
            "Close with gratitude and seriousness rather than triumphalism.",
        ],
        "debrief": [
            "What should you now distrust in yourself more than before?",
            "What should you now trust in honest inquiry more than before?",
            "What question do you want to keep examining after the course ends?",
        ],
        "listen_for": [
            "Students can state the course thesis in their own words without simply echoing slogans.",
            "Participants reflect on method quality more than on scoring a final ideological win.",
            "The group can describe one concrete practice they want to carry into real decisions.",
        ],
        "adaptation": [
            "If the capstones run long, use paired summaries and reserve whole-group time for patterns rather than full reports.",
            "If the ending feels too triumphant, return to open questions and the continuing cost of self-honesty.",
            "If the final run confuses people, narrate it slowly and compare it explicitly to the way the class would have read it on session three.",
        ],
        "homework": "No formal homework. Encourage participants to keep the personal method statement and revisit it after meaningful life decisions.",
        "teacher_note": "End quietly and strongly. The deepest success of the course is not instant agreement. It is a durable respect for evidence-capped belief.",
        "hazard": "Avoid a victory-lap mood. The right ending is sober, humane, and truth-centered.",
    },
]


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="TitleCurriculum",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=29,
            leading=32,
            textColor=PALETTE["ink"],
            alignment=TA_LEFT,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SubtitleCurriculum",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=12.2,
            leading=16,
            textColor=PALETTE["muted"],
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="EyebrowCurriculum",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=11,
            textColor=PALETTE["brown"],
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SectionTitleCurriculum",
            parent=styles["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=19.5,
            leading=23.5,
            textColor=PALETTE["ink"],
            spaceAfter=7,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SessionTitleCurriculum",
            parent=styles["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=26,
            textColor=PALETTE["ink"],
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SubheadCurriculum",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=12.2,
            leading=14.8,
            textColor=PALETTE["ink"],
            spaceBefore=6,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodyCurriculum",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.9,
            leading=13.8,
            textColor=PALETTE["muted"],
            spaceAfter=7,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodyTightCurriculum",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.0,
            leading=12.2,
            textColor=PALETTE["muted"],
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CardTitleCurriculum",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=11.0,
            leading=12.8,
            textColor=PALETTE["ink"],
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="MiniLabelCurriculum",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=8.8,
            leading=10.8,
            textColor=PALETTE["brown"],
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CalloutCurriculum",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=11.6,
            leading=15.2,
            textColor=PALETTE["ink"],
        )
    )
    styles.add(
        ParagraphStyle(
            name="SmallCenterCurriculum",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.1,
            leading=10.2,
            textColor=PALETTE["muted"],
            alignment=TA_CENTER,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BulletCurriculum",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.4,
            leading=12.8,
            textColor=PALETTE["muted"],
            spaceAfter=1,
        )
    )
    styles.add(
        ParagraphStyle(
            name="AgendaCurriculum",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.8,
            leading=11.6,
            textColor=PALETTE["muted"],
        )
    )
    return styles


def page_background(canvas, doc):
    canvas.saveState()
    width, height = letter
    canvas.setFillColor(PALETTE["paper"])
    canvas.rect(0, 0, width, height, fill=1, stroke=0)
    canvas.setFillColor(colors.HexColor("#fbf4e8"))
    canvas.rect(0, height - 0.92 * inch, width, 0.92 * inch, fill=1, stroke=0)
    canvas.setStrokeColor(PALETTE["line"])
    canvas.setLineWidth(0.8)
    canvas.line(0.66 * inch, 0.6 * inch, width - 0.66 * inch, 0.6 * inch)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.setFillColor(PALETTE["brown"])
    canvas.drawString(0.72 * inch, height - 0.48 * inch, "BELIEF OVERREACH AUDIT CURRICULUM")
    canvas.setFont("Helvetica", 8.4)
    canvas.setFillColor(PALETTE["muted"])
    canvas.drawRightString(width - 0.72 * inch, 0.4 * inch, f"Page {doc.page}")
    canvas.restoreState()


def cover_background(canvas, doc):
    canvas.saveState()
    width, height = letter
    canvas.setFillColor(PALETTE["paper"])
    canvas.rect(0, 0, width, height, fill=1, stroke=0)
    canvas.setFillColor(PALETTE["sand"])
    canvas.rect(0, height - 2.95 * inch, width, 2.95 * inch, fill=1, stroke=0)

    block_y = height - 2.45 * inch
    accents = ["green", "blue", "amber", "red"]
    labels = ["Ada", "Milo", "Willa", "Zeke"]
    for index, color_name in enumerate(accents):
        x = (0.78 + index * 1.48) * inch
        canvas.setFillColor(PALETTE[color_name])
        canvas.roundRect(x, block_y, 1.28 * inch, 1.16 * inch, 12, fill=1, stroke=0)
        canvas.setFillColor(PALETTE["paper"])
        canvas.setFont("Helvetica-Bold", 13)
        canvas.drawCentredString(x + 0.64 * inch, block_y + 0.64 * inch, labels[index][0])
        canvas.setFont("Helvetica", 8.4)
        canvas.drawCentredString(x + 0.64 * inch, block_y + 0.29 * inch, labels[index])

    canvas.setStrokeColor(colors.HexColor("#cfba98"))
    canvas.setLineWidth(1.2)
    center_x = width - 1.48 * inch
    center_y = height - 1.82 * inch
    canvas.circle(center_x, center_y, 0.48 * inch, stroke=1, fill=0)
    canvas.line(center_x - 0.78 * inch, center_y, center_x - 0.13 * inch, center_y)
    canvas.line(center_x + 0.13 * inch, center_y, center_x + 0.78 * inch, center_y)
    canvas.line(center_x, center_y - 0.78 * inch, center_x, center_y - 0.13 * inch)
    canvas.line(center_x, center_y + 0.13 * inch, center_x, center_y + 0.78 * inch)

    canvas.setFont("Helvetica-Bold", 8.6)
    canvas.setFillColor(PALETTE["ink"])
    canvas.drawString(0.72 * inch, 0.8 * inch, "Crosshairs Audit Lab")
    canvas.setFont("Helvetica", 8.2)
    canvas.setFillColor(PALETTE["muted"])
    canvas.drawString(0.72 * inch, 0.58 * inch, "Teacher-facing small-group curriculum for the Belief Overreach Audit")
    canvas.restoreState()


def info_card(title, body, styles, accent, width):
    background_map = {
        "green": PALETTE["soft_green"],
        "blue": PALETTE["soft_blue"],
        "amber": PALETTE["soft_amber"],
        "red": PALETTE["soft_red"],
        "brown": PALETTE["soft_brown"],
        "teal": PALETTE["soft_blue"],
        "plum": PALETTE["soft_plum"],
    }
    card = Table(
        [[Paragraph(title, styles["CardTitleCurriculum"])], [Paragraph(body, styles["BodyTightCurriculum"])]],
        colWidths=[width],
    )
    card.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), background_map.get(accent, PALETTE["soft_brown"])),
                ("BOX", (0, 0), (-1, -1), 1, PALETTE["line"]),
                ("LINEABOVE", (0, 0), (-1, 0), 4, PALETTE.get(accent, PALETTE["brown"])),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return card


def data_card(label, value, body, styles, accent, width):
    card = Table(
        [
            [Paragraph(label, styles["MiniLabelCurriculum"])],
            [Paragraph(value, styles["CardTitleCurriculum"])],
            [Paragraph(body, styles["BodyTightCurriculum"])],
        ],
        colWidths=[width],
    )
    card.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALETTE["paper"]),
                ("BOX", (0, 0), (-1, -1), 1, PALETTE["line"]),
                ("LINEABOVE", (0, 0), (-1, 0), 4, PALETTE[accent]),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return card


def callout(text, styles, accent="amber"):
    box = Table([[Paragraph(text, styles["CalloutCurriculum"])]], colWidths=[6.18 * inch])
    box.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALETTE["soft_gold"]),
                ("BOX", (0, 0), (-1, -1), 1, colors.HexColor("#d7b56b")),
                ("LINEBEFORE", (0, 0), (0, -1), 6, PALETTE[accent]),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 9),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
            ]
        )
    )
    return box


def bullet_list(items, styles):
    return ListFlowable(
        [ListItem(Paragraph(item, styles["BulletCurriculum"]), value="-") for item in items],
        bulletType="bullet",
        start="-",
        leftIndent=12,
        bulletFontName="Helvetica-Bold",
        bulletFontSize=10,
        bulletOffsetY=1,
    )


def agenda_table(rows, styles, accent):
    data = [
        [
            Paragraph("<b>Time</b>", styles["AgendaCurriculum"]),
            Paragraph("<b>Segment</b>", styles["AgendaCurriculum"]),
            Paragraph("<b>Why this matters</b>", styles["AgendaCurriculum"]),
        ]
    ]
    for time_text, segment, why in rows:
        data.append(
            [
                Paragraph(time_text, styles["AgendaCurriculum"]),
                Paragraph(segment, styles["AgendaCurriculum"]),
                Paragraph(why, styles["AgendaCurriculum"]),
            ]
        )

    table = Table(data, colWidths=[0.85 * inch, 1.85 * inch, 3.48 * inch])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), PALETTE["soft_brown"]),
                ("TEXTCOLOR", (0, 0), (-1, 0), PALETTE["ink"]),
                ("BOX", (0, 0), (-1, -1), 1, PALETTE["line"]),
                ("INNERGRID", (0, 0), (-1, -1), 0.7, PALETTE["line"]),
                ("LINEABOVE", (0, 0), (-1, 0), 4, PALETTE[accent]),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def cover_story(styles):
    return [
        Spacer(1, 2.9 * inch),
        Paragraph("Belief Overreach Audit", styles["TitleCurriculum"]),
        Paragraph(
            "A full small-group curriculum for young, honest seekers who want to test whether a way of believing deserves trust.",
            styles["SubtitleCurriculum"],
        ),
        Spacer(1, 0.12 * inch),
        callout(
            "This curriculum teaches participants to separate support from pull, hope from warrant, and sincere longing from evidence-capped belief.",
            styles,
            "red",
        ),
        Spacer(1, 0.28 * inch),
        Table(
            [
                [
                    info_card(
                        "Who this is for",
                        "Older teens and young adults who can handle a serious inquiry into belief, uncertainty, and the cost of overcommitment.",
                        styles,
                        "green",
                        1.95 * inch,
                    ),
                    info_card(
                        "What it trains",
                        "Clear definitions, fair comparison across domains, emotional honesty, and the habit of keeping confidence inside support.",
                        styles,
                        "blue",
                        1.95 * inch,
                    ),
                    info_card(
                        "What it avoids",
                        "Mockery, coercion, premature certainty, and the pressure to perform doubt or testimony for the group.",
                        styles,
                        "amber",
                        1.95 * inch,
                    ),
                ]
            ],
            colWidths=[2.06 * inch, 2.06 * inch, 2.06 * inch],
            style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]),
        ),
        Spacer(1, 0.2 * inch),
        Paragraph(
            "Ten sessions. Ninety minutes each. Designed for a dynamic teacher who wants to combine honesty, rigor, and creativity without sacrificing emotional safety.",
            styles["SmallCenterCurriculum"],
        ),
    ]


def overview_story(styles):
    story = [
        Paragraph("01  PROGRAM OVERVIEW", styles["EyebrowCurriculum"]),
        Paragraph("What the curriculum is trying to produce", styles["SectionTitleCurriculum"]),
        Paragraph(
            "The curriculum is built around one central claim: when confidence rises beyond perceived evidence, belief becomes less truth-tracking and usually more costly. The course does not merely state that claim. It helps participants feel it, test it, object to it, and finally apply it to themselves with seriousness and care.",
            styles["BodyCurriculum"],
        ),
        Paragraph(
            "The strongest outcome is not ideological conformity. The strongest outcome is that students learn a disciplined habit of asking whether a method of believing deserves trust. That means they can inspect gambling, investing, romance, and religion without changing the standard halfway through.",
            styles["BodyCurriculum"],
        ),
        Table(
            [
                [
                    data_card("Primary audience", "Age 15 to 24", "Best for older teens and young adults who can tolerate ambiguity without needing instant closure.", styles, "green", 2.0 * inch),
                    data_card("Group size", "6 to 14", "Small enough for honesty, large enough for varied perspectives and lively activities.", styles, "blue", 2.0 * inch),
                    data_card("Format", "10 x 90 min", "A consistent structure gives the course rhythm while the scenarios keep it alive and concrete.", styles, "amber", 2.0 * inch),
                ]
            ],
            colWidths=[2.07 * inch, 2.07 * inch, 2.07 * inch],
        ),
        Spacer(1, 0.16 * inch),
        Paragraph("By the end, participants should be able to:", styles["SubheadCurriculum"]),
        bullet_list(
            [
                "Define faith in the course's sense as confidence, trust, or commitment above perceived evidence.",
                "Explain why sincere motives do not guarantee a reliable method.",
                "Show why lucky short-term wins do not rescue a weaker long-run method.",
                "Apply the same standard to religion that they already apply to gambling, investing, and romance.",
                "Perform a private self-audit without treating uncertainty as a failure.",
            ],
            styles,
        ),
        Spacer(1, 0.1 * inch),
        callout(
            "Teach the method first. If the method becomes clear, the transfer to religion will feel earned rather than forced.",
            styles,
            "green",
        ),
        Spacer(1, 0.18 * inch),
        Paragraph("Core teacher posture", styles["SubheadCurriculum"]),
        Table(
            [
                [
                    info_card("Be calm", "Students need to feel that the room can survive disagreement and uncertainty.", styles, "green", 1.95 * inch),
                    info_card("Be symmetrical", "No favored claim gets an easier standard, and no disfavored claim gets a cheaper critique.", styles, "red", 1.95 * inch),
                    info_card("Be humane", "Reward candor, caution, and honest self-correction more than verbal speed or debate flair.", styles, "blue", 1.95 * inch),
                ]
            ],
            colWidths=[2.06 * inch, 2.06 * inch, 2.06 * inch],
        ),
    ]
    return story


def architecture_story(styles):
    session_rows = [
        [
            Paragraph("<b>No.</b>", styles["BodyTightCurriculum"]),
            Paragraph("<b>Title</b>", styles["BodyTightCurriculum"]),
            Paragraph("<b>Main move</b>", styles["BodyTightCurriculum"]),
        ]
    ]
    for session in SESSIONS:
        session_rows.append(
            [
                Paragraph(str(session["number"]), styles["BodyTightCurriculum"]),
                Paragraph(session["title"], styles["BodyTightCurriculum"]),
                Paragraph(session["big_question"], styles["BodyTightCurriculum"]),
            ]
        )

    story = [
        Paragraph("02  COURSE ARCHITECTURE", styles["EyebrowCurriculum"]),
        Paragraph("How the ten sessions build on one another", styles["SectionTitleCurriculum"]),
        Paragraph(
            "The sequence matters. The early sessions calibrate basic reasoning habits. The middle sessions surface the same pattern across different domains. The later sessions transfer that pattern into religion, objections, and personal application. The course only works if participants repeatedly meet the same structure in fresh settings.",
            styles["BodyCurriculum"],
        ),
        Table(
            session_rows,
            colWidths=[0.6 * inch, 2.2 * inch, 3.45 * inch],
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), PALETTE["soft_brown"]),
                    ("BOX", (0, 0), (-1, -1), 1, PALETTE["line"]),
                    ("INNERGRID", (0, 0), (-1, -1), 0.7, PALETTE["line"]),
                    ("LEFTPADDING", (0, 0), (-1, -1), 8),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                    ("TOPPADDING", (0, 0), (-1, -1), 6),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ]
            ),
        ),
        Spacer(1, 0.16 * inch),
        Paragraph("Suggested session rhythm", styles["SubheadCurriculum"]),
        bullet_list(
            [
                "Opening activation: begin with something concrete before naming the principle.",
                "Core activity: use the tool or a live exercise to make the pattern vivid.",
                "Concept frame: give the language only after the group has felt the problem.",
                "Transfer discussion: ask where the same structure appears elsewhere.",
                "Private reflection: let participants process without performance pressure.",
                "Exit ticket: end with one sharp takeaway rather than a vague mood.",
            ],
            styles,
        ),
    ]
    return story


def teacher_setup_story(styles):
    return [
        Paragraph("03  TEACHER SETUP", styles["EyebrowCurriculum"]),
        Paragraph("What to prepare before the first session", styles["SectionTitleCurriculum"]),
        Paragraph(
            "A good launch matters. If the first meeting feels safe, concrete, and purposeful, the harder sessions later in the course will feel earned instead of abrupt. Use this page as your pre-course checklist.",
            styles["BodyCurriculum"],
        ),
        Table(
            [
                [
                    info_card("Teacher materials", "Laptop, projector or large display, whiteboard, markers, timer, printed rubrics, and reflection sheets.", styles, "brown", 3.0 * inch),
                    info_card("Participant materials", "Pens, journals or paper, vocabulary page, session worksheets, and optional name cards.", styles, "amber", 3.0 * inch),
                ]
            ],
            colWidths=[3.08 * inch, 3.08 * inch],
        ),
        Spacer(1, 0.16 * inch),
        Table(
            [
                [
                    info_card("Room setup", "Arrange seats so students can pivot easily between whole-group discussion, pair work, and quiet reflection. Keep the screen visible but not overpowering.", styles, "green", 2.0 * inch),
                    info_card("Tone setting", "Open by saying the course is about honest methods, not about embarrassing believers or rewarding performance doubt.", styles, "blue", 2.0 * inch),
                    info_card("Visible norms", "Post three rules where everyone can see them: be honest, be symmetrical, and never confuse emotional force with evidence.", styles, "red", 2.0 * inch),
                ]
            ],
            colWidths=[2.07 * inch, 2.07 * inch, 2.07 * inch],
        ),
        Spacer(1, 0.16 * inch),
        Paragraph("Before the first meeting, make sure you can answer:", styles["SubheadCurriculum"]),
        bullet_list(
            [
                "How will I explain the course's definition of faith without sounding slippery or evasive?",
                "How will I reassure students that uncertainty is allowed here?",
                "How will I respond if a participant feels exposed, reactive, or suddenly defensive?",
                "How will I keep the course focused on methods of belief rather than on scoring tribal points?",
            ],
            styles,
        ),
        Spacer(1, 0.1 * inch),
        callout(
            "If you need one sentence to define the course on night one, use this: we are here to test whether a way of believing deserves trust, not to punish anyone for caring deeply about what is true.",
            styles,
            "green",
        ),
    ]


def session_story(session, styles):
    accent = session["accent"]
    accent_title = f"SESSION {session['number']:02d}"
    cards = Table(
        [
            [
                data_card("Purpose", "What this session is for", session["purpose"], styles, accent, 1.97 * inch),
                data_card("Big question", "Keep returning to this", session["big_question"], styles, accent, 1.97 * inch),
                data_card("Homework", "Carry the work forward", session["homework"], styles, accent, 1.97 * inch),
            ]
        ],
        colWidths=[2.05 * inch, 2.05 * inch, 2.05 * inch],
        style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]),
    )

    support_row = Table(
        [
            [
                info_card("Learning outcomes", "<br/>".join(f"- {item}" for item in session["outcomes"]), styles, accent, 2.95 * inch),
                info_card("Preparation", "<br/>".join(f"- {item}" for item in session["prep"]), styles, "brown", 2.95 * inch),
            ]
        ],
        colWidths=[3.07 * inch, 3.07 * inch],
        style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]),
    )

    lower_row = Table(
        [
            [
                info_card("Activity notes", "<br/>".join(f"- {item}" for item in session["activities"]), styles, accent, 2.95 * inch),
                info_card("Debrief prompts", "<br/>".join(f"- {item}" for item in session["debrief"]), styles, "blue", 2.95 * inch),
            ]
        ],
        colWidths=[3.07 * inch, 3.07 * inch],
        style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]),
    )

    follow_through_row = Table(
        [
            [
                info_card("What to listen for", "<br/>".join(f"- {item}" for item in session["listen_for"]), styles, "teal", 2.95 * inch),
                info_card("Flexible move", "<br/>".join(f"- {item}" for item in session["adaptation"]), styles, "plum", 2.95 * inch),
            ]
        ],
        colWidths=[3.07 * inch, 3.07 * inch],
        style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]),
    )

    return [
        Paragraph(accent_title, styles["EyebrowCurriculum"]),
        Paragraph(session["title"], styles["SessionTitleCurriculum"]),
        cards,
        Spacer(1, 0.14 * inch),
        agenda_table(session["agenda"], styles, accent),
        Spacer(1, 0.14 * inch),
        support_row,
        Spacer(1, 0.12 * inch),
        lower_row,
        Spacer(1, 0.12 * inch),
        follow_through_row,
        Spacer(1, 0.12 * inch),
        callout(f"Teacher note: {session['teacher_note']}", styles, accent),
        Spacer(1, 0.1 * inch),
        info_card("Common hazard", session["hazard"], styles, "red", 6.15 * inch),
    ]


def assessment_story(styles):
    story = [
        Paragraph("13  ASSESSMENT AND CAPSTONE", styles["EyebrowCurriculum"]),
        Paragraph("How to evaluate growth without rewarding conformity", styles["SectionTitleCurriculum"]),
        Paragraph(
            "Assessment should measure whether the participant understands and can apply the framework. It should not measure whether the participant lands on the teacher's preferred worldview by the end of the course. The course is about method quality, not performative agreement.",
            styles["BodyCurriculum"],
        ),
        Table(
            [
                [
                    info_card("What to assess", "Conceptual clarity, symmetry of standards, ability to distinguish support from pull, honesty about uncertainty, and quality of case analysis.", styles, "green", 3.0 * inch),
                    info_card("What not to assess", "Whether the participant abandons religion, reveals private doubt, or reaches a predetermined personal conclusion on schedule.", styles, "red", 3.0 * inch),
                ]
            ],
            colWidths=[3.08 * inch, 3.08 * inch],
        ),
        Spacer(1, 0.16 * inch),
        Paragraph("Recommended capstone options", styles["SubheadCurriculum"]),
        bullet_list(
            [
                "A short presentation comparing two domains without changing standards.",
                "A written reflection on one belief that feels emotionally costly to recalibrate.",
                "A case study of a public movement, claim, or ideology using the course framework.",
                "A personal epistemic charter describing how the participant wants to handle support, pull, and uncertainty in the future.",
            ],
            styles,
        ),
        Spacer(1, 0.1 * inch),
        Paragraph("Simple rubric", styles["SubheadCurriculum"]),
        Table(
            [
                [
                    Paragraph("<b>Category</b>", styles["BodyTightCurriculum"]),
                    Paragraph("<b>What strong work looks like</b>", styles["BodyTightCurriculum"]),
                ],
                [
                    Paragraph("Definitions", styles["BodyTightCurriculum"]),
                    Paragraph("Uses faith, support, pull, and core rationality accurately and consistently.", styles["BodyTightCurriculum"]),
                ],
                [
                    Paragraph("Symmetry", styles["BodyTightCurriculum"]),
                    Paragraph("Applies the same standard across favored and disfavored claims.", styles["BodyTightCurriculum"]),
                ],
                [
                    Paragraph("Interpretation", styles["BodyTightCurriculum"]),
                    Paragraph("Knows that a lucky run does not rescue a weaker method.", styles["BodyTightCurriculum"]),
                ],
                [
                    Paragraph("Honesty", styles["BodyTightCurriculum"]),
                    Paragraph("Acknowledges uncertainty and avoids pretending the case is stronger than it is.", styles["BodyTightCurriculum"]),
                ],
                [
                    Paragraph("Clarity", styles["BodyTightCurriculum"]),
                    Paragraph("Explains the course thesis in plain language rather than in slogans.", styles["BodyTightCurriculum"]),
                ],
            ],
            colWidths=[1.35 * inch, 4.75 * inch],
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), PALETTE["soft_brown"]),
                    ("BOX", (0, 0), (-1, -1), 1, PALETTE["line"]),
                    ("INNERGRID", (0, 0), (-1, -1), 0.7, PALETTE["line"]),
                    ("LEFTPADDING", (0, 0), (-1, -1), 8),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                    ("TOPPADDING", (0, 0), (-1, -1), 6),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ]
            ),
        ),
        Spacer(1, 0.16 * inch),
        callout(
            "A participant may finish the course still religious, still uncertain, or still undecided. The question is whether they now think more honestly about what support actually warrants.",
            styles,
            "brown",
        ),
    ]
    return story


def survey_story(styles):
    story = [
        Paragraph("14  SURVEYS AND HANDOUTS", styles["EyebrowCurriculum"]),
        Paragraph("Simple tools for measuring growth and supporting the room", styles["SectionTitleCurriculum"]),
        Paragraph(
            "The curriculum becomes easier to teach well when participants can see where they began and what changed. These survey prompts and handout suggestions keep the course practical without turning it into bureaucracy.",
            styles["BodyCurriculum"],
        ),
        Table(
            [
                [
                    info_card(
                        "Pre-course survey",
                        "Ask students to rate statements like: I can tell the difference between hope and evidence; waiting for better evidence feels weak; faith is often a virtue; a lucky outcome can prove a good method; religion should be judged by the same epistemic standards as other claims.",
                        styles,
                        "green",
                        3.0 * inch,
                    ),
                    info_card(
                        "Post-course survey",
                        "Repeat the same statements, then add open questions: What changed in your thinking? Which scenario still feels hardest? What belief-forming habit do you most want to keep?",
                        styles,
                        "blue",
                        3.0 * inch,
                    ),
                ]
            ],
            colWidths=[3.08 * inch, 3.08 * inch],
        ),
        Spacer(1, 0.16 * inch),
        Paragraph("Suggested printable handouts", styles["SubheadCurriculum"]),
        bullet_list(
            [
                "Course vocabulary sheet: faith, perceived support, pull, demand, core rationality, life-budget, truth-tracking.",
                "Support versus pull worksheet: one page with claims, columns, and reflection prompts.",
                "Objection cards: compact prompts for session eight, one objection per card.",
                "Personal method statement sheet: a final template for writing a truth-seeking practice rule.",
                "Capstone rubric: one page with definitions, symmetry, interpretation, honesty, and clarity.",
            ],
            styles,
        ),
        Spacer(1, 0.1 * inch),
        callout(
            "If the group is younger or more cautious, keep the surveys short and let all identity-sensitive answers remain private. The point is growth in method, not forced disclosure.",
            styles,
            "blue",
        ),
    ]
    return story


def implementation_story(styles):
    story = [
        Paragraph("15  IMPLEMENTATION NOTES", styles["EyebrowCurriculum"]),
        Paragraph("How to scale, compress, or soften the curriculum without hollowing it out", styles["SectionTitleCurriculum"]),
        Paragraph(
            "Not every teacher will have the same room, timeline, or student readiness. The course can be adjusted, but the backbone should remain intact: concrete calibration first, transfer across domains second, religion third, objections fourth, personal application last.",
            styles["BodyCurriculum"],
        ),
        Table(
            [
                [
                    info_card(
                        "If you only have 6 sessions",
                        "Combine sessions 1 and 2, combine 3 and 4, combine 5 and 7, keep session 6 intact, keep session 8 intact, and end with a merged version of sessions 9 and 10.",
                        styles,
                        "amber",
                        1.95 * inch,
                    ),
                    info_card(
                        "If the room is religiously mixed",
                        "Emphasize symmetry, keep the definitions visible, and use ordinary-life domains often enough that no one feels singled out before the method is understood.",
                        styles,
                        "green",
                        1.95 * inch,
                    ),
                    info_card(
                        "If the room is emotionally volatile",
                        "Reduce public sharing, increase journaling, use pairs over plenary debate, and keep the teacher language slow, concrete, and non-accusatory.",
                        styles,
                        "red",
                        1.95 * inch,
                    ),
                ]
            ],
            colWidths=[2.06 * inch, 2.06 * inch, 2.06 * inch],
        ),
        Spacer(1, 0.16 * inch),
        Paragraph("Non-negotiables even in a compressed version", styles["SubheadCurriculum"]),
        bullet_list(
            [
                "Do not skip the calibration work at the front of the course.",
                "Do not move religion before the group has seen the same structure in easier cases.",
                "Do not let objections disappear; a framework that cannot survive criticism will not feel trustworthy.",
                "Do not force personal application before the room feels safe enough to think honestly.",
            ],
            styles,
        ),
        Spacer(1, 0.1 * inch),
        callout(
            "A shorter version should feel lean, not rushed. If you cut sessions, preserve the order of the reasoning spine rather than trying to sample everything lightly.",
            styles,
            "amber",
        ),
    ]
    return story


def appendix_story(styles):
    story = [
        Paragraph("16  APPENDICES", styles["EyebrowCurriculum"]),
        Paragraph("Facilitation safeguards, glossary, and question bank", styles["SectionTitleCurriculum"]),
        Paragraph("Emotional and social safeguards", styles["SubheadCurriculum"]),
        bullet_list(
            [
                "Never force a participant to disclose their personal religious position.",
                "Never reward performative skepticism more than careful honesty.",
                "Normalize uncertainty as a possible sign of integrity rather than weakness.",
                "Separate criticism of a method from contempt for people who inherited that method.",
                "Slow down whenever the room becomes reactive, tribal, or theatrically certain.",
            ],
            styles,
        ),
        Spacer(1, 0.08 * inch),
        Paragraph("Glossary", styles["SubheadCurriculum"]),
        Table(
            [
                [Paragraph("<b>Term</b>", styles["BodyTightCurriculum"]), Paragraph("<b>Working meaning in this course</b>", styles["BodyTightCurriculum"])],
                [Paragraph("Faith", styles["BodyTightCurriculum"]), Paragraph("Confidence, trust, or commitment that exceeds perceived evidence.", styles["BodyTightCurriculum"])],
                [Paragraph("Perceived support", styles["BodyTightCurriculum"]), Paragraph("The support the person currently takes themselves to have.", styles["BodyTightCurriculum"])],
                [Paragraph("Core rationality", styles["BodyTightCurriculum"]), Paragraph("Trying to keep belief inside perceived support.", styles["BodyTightCurriculum"])],
                [Paragraph("Pull", styles["BodyTightCurriculum"]), Paragraph("Emotional or social force that attracts commitment without itself becoming evidence.", styles["BodyTightCurriculum"])],
                [Paragraph("Demand", styles["BodyTightCurriculum"]), Paragraph("What a claim is asking the person to spend, obey, or surrender.", styles["BodyTightCurriculum"])],
                [Paragraph("Truth-tracking", styles["BodyTightCurriculum"]), Paragraph("A method's tendency to move with what is actually supported rather than with what merely feels attractive.", styles["BodyTightCurriculum"])],
                [Paragraph("Life-budget", styles["BodyTightCurriculum"]), Paragraph("The finite time, trust, money, energy, and identity a person can spend.", styles["BodyTightCurriculum"])],
            ],
            colWidths=[1.45 * inch, 4.65 * inch],
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), PALETTE["soft_brown"]),
                    ("BOX", (0, 0), (-1, -1), 1, PALETTE["line"]),
                    ("INNERGRID", (0, 0), (-1, -1), 0.7, PALETTE["line"]),
                    ("LEFTPADDING", (0, 0), (-1, -1), 8),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                    ("TOPPADDING", (0, 0), (-1, -1), 6),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ]
            ),
        ),
        Spacer(1, 0.14 * inch),
        Paragraph("High-value discussion questions", styles["SubheadCurriculum"]),
        bullet_list(
            [
                "What is the difference between being moved and being warranted?",
                "Can a belief be emotionally helpful and still be epistemically poor?",
                "Why is religion harder for many people to inspect than gambling?",
                "What does waiting preserve that overcommitment may spend too quickly?",
                "If a claim is true, why should it need our confidence to outrun the support?",
            ],
            styles,
        ),
        Spacer(1, 0.1 * inch),
        callout(
            "Use the tool repeatedly, but never let the interface replace the underlying habit. The enduring lesson is not to memorize Ada, Milo, Willa, and Zeke. It is to learn how to ask, in any domain, whether pull has started doing evidential work it never earned.",
            styles,
            "green",
        ),
    ]
    return story


def build_story(styles):
    story = cover_story(styles)
    story.append(PageBreak())
    story.extend(overview_story(styles))
    story.append(PageBreak())
    story.extend(architecture_story(styles))
    story.append(PageBreak())
    story.extend(teacher_setup_story(styles))
    for session in SESSIONS:
        story.append(PageBreak())
        story.extend(session_story(session, styles))
    story.append(PageBreak())
    story.extend(assessment_story(styles))
    story.append(PageBreak())
    story.extend(survey_story(styles))
    story.append(PageBreak())
    story.extend(implementation_story(styles))
    story.append(PageBreak())
    story.extend(appendix_story(styles))
    return story


def build_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    styles = build_styles()
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=letter,
        leftMargin=0.72 * inch,
        rightMargin=0.72 * inch,
        topMargin=0.9 * inch,
        bottomMargin=0.78 * inch,
        title="Belief Overreach Audit Curriculum",
        author="OpenAI Codex",
        subject="Full small-group curriculum for the Belief Overreach Audit",
    )
    story = build_story(styles)
    doc.build(story, onFirstPage=cover_background, onLaterPages=page_background)


if __name__ == "__main__":
    build_pdf()

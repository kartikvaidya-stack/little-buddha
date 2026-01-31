export type DayContent = {
  day: number;
  title: string;
  summary: string;
  source?: string;
  teaching: string;
  prompt: string;
  practice: string;
  image?: string;
};

const RAW_TEACHINGS = `
Day 1 | Who Was the Buddha | Historical Buddha, human not divine (MN 26)
Day 2 | Why the Buddha Taught | Compassion as motivation (Ariyapariyesana Sutta)
Day 3 | The Middle Way | Avoiding extremes (SN 56.11)
Day 4 | What Is Liberation | Freedom from suffering (Nibbana)
Day 5 | Seeing Clearly | Right View begins the path
Day 6 | Suffering Exists | First Noble Truth
Day 7 | Suffering Has Causes | Second Noble Truth
Day 8 | Suffering Can End | Third Noble Truth
Day 9 | The Path to End Suffering | Noble Eightfold Path
Day 10 | Faith and Inquiry | Kalama Sutta
Day 11 | Mind Precedes All | Dhammapada Verse 1
Day 12 | Thoughts Shape Reality | Dhammapada Verse 2
Day 13 | Hatred Never Ends Hatred | Dhammapada Verse 5
Day 14 | Vigilance Leads to Life | Dhammapada Verse 21
Day 15 | The Untamed Mind | Dhammapada Verse 35
Day 16 | The Disciplined Mind | Dhammapada Verse 36
Day 17 | The Wise Guard the Mind | Dhammapada Verse 37
Day 18 | The Arrow of Suffering | Sallatha Sutta
Day 19 | Clinging Causes Pain | Upadana teaching
Day 20 | Impermanence | Anicca
Day 21 | Unsatisfactoriness | Dukkha
Day 22 | Non-Self | Anatta
Day 23 | Seeing Impermanence | Vipassana insight
Day 24 | Change Is Inevitable | Anicca reflection
Day 25 | Letting Go | Nekkhamma
Day 26 | Craving | Tanha
Day 27 | Desire Never Ends | Fire Sermon (SN 35.28)
Day 28 | The Burning World | Sense bases on fire
Day 29 | Cooling the Fire | Nibbana imagery
Day 30 | Renunciation | Simplicity as freedom
Day 31 | Right View | Eightfold Path
Day 32 | Right Intention | Renunciation, goodwill, harmlessness
Day 33 | Right Speech | Truthful, gentle, timely speech
Day 34 | Right Action | Non-harming conduct
Day 35 | Right Livelihood | Ethical earning
Day 36 | Right Effort | Preventing unwholesome states
Day 37 | Right Mindfulness | Satipatthana
Day 38 | Right Concentration | Jhana
Day 39 | The Path Is One | Integrated practice
Day 40 | Walking the Path | Daily application
Day 41 | The Body | First foundation of mindfulness
Day 42 | Breathing | Anapanasati
Day 43 | Posture Awareness | Sitting, standing, walking
Day 44 | Feeling Tones | Pleasant, unpleasant, neutral
Day 45 | Mind States | Observing moods
Day 46 | Mental Objects | Dhammas
Day 47 | Mindfulness of Death | Maranasati
Day 48 | Remembering Death | Urgency without fear
Day 49 | Heedfulness | Appamada
Day 50 | The Preciousness of Life | Rare human birth
Day 51 | Sense Restraint | Guarding the doors
Day 52 | Contact | Phassa
Day 53 | Feeling | Vedana
Day 54 | Craving | Tanha
Day 55 | Clinging | Upadana
Day 56 | Becoming | Bhava
Day 57 | Birth | Jati
Day 58 | Aging and Death | Jarāmaraṇa
Day 59 | Dependent Origination | Paticca-samuppada
Day 60 | Breaking the Chain | Freedom through awareness
Day 61 | The Five Aggregates | Khandhas
Day 62 | Form | Rupa
Day 63 | Feeling | Vedana
Day 64 | Perception | Sanna
Day 65 | Mental Formations | Sankhara
Day 66 | Consciousness | Vinnana
Day 67 | No Aggregate Is Self | Anatta insight
Day 68 | Identity View | Sakkaya-ditthi
Day 69 | Letting Go of “I” | Ego dissolution
Day 70 | Freedom Without Identity | Liberation teaching
Day 71 | Loving-Kindness | Metta
Day 72 | Compassion | Karuna
Day 73 | Sympathetic Joy | Mudita
Day 74 | Equanimity | Upekkha
Day 75 | The Four Brahmaviharas | Divine abodes
Day 76 | Friendliness | Non-hostility
Day 77 | Forgiveness | Release of resentment
Day 78 | Patience | Khanti
Day 79 | Tolerance | Endurance
Day 80 | Anger Harms First | Anger teachings
Day 81 | Conquest of Anger | Dhammapada 221
Day 82 | Harmlessness | Ahimsa
Day 83 | Ethics | Sila
Day 84 | The Five Precepts | Lay discipline
Day 85 | Right Relationship | Sigalovada Sutta
Day 86 | Family as Practice | Lay ethics
Day 87 | Friendship | Kalyanamitta
Day 88 | Wise Companionship | Spiritual friendship
Day 89 | Solitude | Beneficial seclusion
Day 90 | Silence | Noble silence
Day 91 | Concentration | Samadhi
Day 92 | Absorption | Jhana basics
Day 93 | Calm and Insight | Samatha-Vipassana
Day 94 | Balance | Middle Way lived
Day 95 | Effort Without Strain | Right effort refined
Day 96 | Energy | Virya
Day 97 | Joy in Practice | Piti
Day 98 | Tranquility | Passaddhi
Day 99 | Happiness Not Dependent | Inner joy
Day 100 | Deep Peace | Samadhi fruit
Day 101 | Wisdom | Panna
Day 102 | Seeing Things As They Are | Yathabhuta
Day 103 | Ignorance | Avijja
Day 104 | Knowledge | Vijja
Day 105 | Ending Ignorance | Awakening
Day 106 | Stream Entry | Sotapanna
Day 107 | Once Returner | Sakadagami
Day 108 | Non-Returner | Anagami
Day 109 | Arahant | Fully liberated
Day 110 | Nibbana | Unconditioned
Day 111 | Not Annihilation | Middle understanding
Day 112 | Beyond Concepts | Ultimate peace
Day 113 | The Unborn | Udana teaching
Day 114 | Fearlessness | Liberation quality
Day 115 | Compassion of the Awakened | Buddha’s activity
Day 116 | Teaching Others | Dana of Dhamma
Day 117 | Skillful Means | Upaya
Day 118 | Gradual Training | Anupubba-sikkha
Day 119 | Discipline | Vinaya spirit
Day 120 | Humility | No pride in progress
Day 121 | Continuous Practice | Never finished
Day 122 | Daily Mindfulness | Ordinary life
Day 123 | Work as Practice | Right livelihood applied
Day 124 | Money and Ethics | Honest living
Day 125 | Consumption | Moderation
Day 126 | Contentment | Santutthi
Day 127 | Simplicity | Few desires
Day 128 | Letting Go of Luxury | Non-indulgence
Day 129 | Comfort Without Attachment | Balanced living
Day 130 | Freedom From Wanting | End of craving
Day 131 | Aging | Inevitable truth
Day 132 | Illness | Body reality
Day 133 | Death | Certainty
Day 134 | Separation | Loss teaching
Day 135 | Ownership Illusion | Nothing truly ours
Day 136 | Acceptance | Wisdom response
Day 137 | Grief | Compassionate awareness
Day 138 | Impermanence of All | Deep insight
Day 139 | Living Fully | Urgency (Samvega)
Day 140 | No Regret | Mindful living
Day 141 | Calm Facing Death | Fearless awareness
Day 142 | Letting Go Completely | Final release
Day 143 | Peace Beyond Fear | Nibbana quality
Day 144 | Trusting the Path | Confidence in Dhamma
Day 145 | Refuge in Buddha | Triple Gem
Day 146 | Refuge in Dhamma | Truth as refuge
Day 147 | Refuge in Sangha | Noble community
Day 148 | Walking Alone | Inner refuge
Day 149 | Teaching by Example | Silent influence
Day 150 | Being the Dhamma | Embodied wisdom
Day 151 | Returning to Simplicity | Beginner’s mind
Day 152 | Nothing to Prove | Ego release
Day 153 | Natural Compassion | Effortless goodness
Day 154 | Stillness | Deep calm
Day 155 | Awareness Remains | Beyond conditions
Day 156 | Freedom Here and Now | Immediate path
Day 157 | Ordinary Enlightenment | Daily life awakening
Day 158 | No Future Promise | Present liberation
Day 159 | Living Gently | Non-harming
Day 160 | Silent Understanding | Beyond words
Day 161 | Completion Without End | Practice continues
Day 162 | Gratitude | Joyful reflection
Day 163 | Teaching Through Living | Example over words
Day 164 | Calm Presence | Unshakeable mind
Day 165 | The End of Fear | Liberation fruit
Day 166 | Peace With the World | Compassionate engagement
Day 167 | Letting Life Be | Non-interference
Day 168 | Effortless Awareness | Natural knowing
Day 169 | No Clinging | Ultimate freedom
Day 170 | Suchness | Tathata
Day 171 | Emptiness | Sunnata
Day 172 | Non-Dual Seeing | Beyond self/other
Day 173 | Quiet Joy | Content being
Day 174 | Final Simplicity | Nothing extra
Day 175 | Walking On | No arrival
Day 176 | Still Practicing | Lifelong path
Day 177 | Calm Confidence | Mature wisdom
Day 178 | Balanced Mind | Middle Way lived
Day 179 | Gentle Strength | Non-force
Day 180 | Silent Wisdom | Beyond teaching
Day 181 | The Path Is Life | Not a technique
Day 182 | Awareness Is Home | Inner refuge
Day 183 | Freedom Without Escape | Here-now
Day 184 | Living Awake | Continuous mindfulness
Day 185 | Nothing Missing | Completeness
Day 186 | The Ordinary Sacred | Daily holiness
Day 187 | Deep Listening | Presence
Day 188 | Seeing Clearly | Wisdom maintained
Day 189 | Peace in Action | Engaged awareness
Day 190 | Enduring Calm | Stable liberation
Day 191 | Compassion Without Fatigue | Boundless heart
Day 192 | Wisdom Without Pride | Humility
Day 193 | Stillness in Motion | Dynamic peace
Day 194 | Awareness Without Effort | Natural mind
Day 195 | Quiet Completion | Path fulfilled
Day 196 | Living Without Fear | Deathless
Day 197 | No Return | Final release
Day 198 | Beyond Becoming | Unconditioned
Day 199 | Freedom Beyond Time | Eternal now
Day 200 | Just This | Ultimate simplicity
Day 201 | The End of Seeking | Content being
Day 202 | Nothing to Hold | Empty hands
Day 203 | Clear Seeing | Final insight
Day 204 | Compassionate Presence | Benefit to all
Day 205 | Peaceful Influence | Silent teaching
Day 206 | Living Lightly | Minimal harm
Day 207 | Trusting Life | Deep acceptance
Day 208 | Inner Stillness | Unmoving mind
Day 209 | Spacious Awareness | Boundless clarity
Day 210 | Ending the Year | Reflection
Day 211 | Beginning Again | Continuous path
Day 212 | Beginner’s Mind | Fresh awareness
Day 213 | Practice Never Ends | Ongoing awakening
Day 214 | No Ownership of Wisdom | Letting go
Day 215 | Teaching Without Teaching | Living truth
Day 216 | Simplicity Refined | Mature practice
Day 217 | Calm Without Effort | Natural peace
Day 218 | Silence Speaks | Wordless Dhamma
Day 219 | Trusting Awareness | Final refuge
Day 220 | The Path Walks You | Effortless living
Day 221 | No More Fear | Deathless freedom
Day 222 | Nothing to Add | Complete
Day 223 | The End of Suffering | Third Noble Truth lived
Day 224 | The Path Fulfilled | Eightfold Path completed
Day 225 | The Mind Released | Liberation
Day 226 | Living as Freedom | Daily liberation
Day 227 | Beyond Teaching | Silence
Day 228 | Peace Remains | Unchanging calm
Day 229 | The End Is Here | Now
Day 230 | Simply Being | Final simplicity
Day 231 | Awareness Without Center | Non-self lived
Day 232 | Boundless Compassion | Universal care
Day 233 | Stillness Everywhere | Omnipresent peace
Day 234 | No Separation | Unity
Day 235 | Final Letting Go | Absolute release
Day 236 | No Return Needed | Complete freedom
Day 237 | Quiet Joy | Nibbana felt
Day 238 | The Deathless | Amata
Day 239 | Nothing Remains | Empty fullness
Day 240 | Peace Beyond Words | Ultimate Dhamma
Day 241 | Living Light | Weightless being
Day 242 | Calm Confidence | Settled mind
Day 243 | Deep Acceptance | Total peace
Day 244 | The End of Fear | Fearless awareness
Day 245 | Silent Completion | Path complete
Day 246 | The Journey Ends | Practice remains
Day 247 | Freedom Is Here | Immediate liberation
Day 248 | Nothing More | Sufficiency
Day 249 | No Becoming | End of craving
Day 250 | Pure Awareness | Natural mind
Day 251 | Stillness Itself | Ultimate calm
Day 252 | Compassion Without Self | Egoless care
Day 253 | Wisdom Without Thought | Direct knowing
Day 254 | Peaceful Being | Natural state
Day 255 | Nothing to Fix | Perfection
Day 256 | Awareness Remains | Eternal clarity
Day 257 | The End of the Path | Fulfillment
Day 258 | Living Awake | Continuous presence
Day 259 | No Past No Future | Timeless now
Day 260 | Just This Moment | Ultimate teaching
Day 261 | Quiet Freedom | Effortless liberation
Day 262 | No Separation | Suchness
Day 263 | Calm Completeness | Finished path
Day 264 | End Without Ending | Open freedom
Day 265 | Silent Wisdom | Beyond doctrine
Day 266 | Peaceful Presence | Benefiting all
Day 267 | Nothing Missing | Complete liberation
Day 268 | Awareness Alone | Pure being
Day 269 | The Deathless State | Nibbana
Day 270 | Final Peace | Ultimate calm
Day 271 | Living Beyond Fear | Absolute safety
Day 272 | Nothing to Hold | Empty freedom
Day 273 | Unconditioned | Beyond form
Day 274 | Peace Without Cause | Nibbana
Day 275 | Quiet Joy | Natural happiness
Day 276 | The End of Suffering | Liberation confirmed
Day 277 | Awareness Without Effort | Natural state
Day 278 | Nothing More to Learn | Wisdom complete
Day 279 | Silent Completion | End of path
Day 280 | Freedom Here | Immediate release
Day 281 | Calm Abiding | Stable peace
Day 282 | Non-Doing | Effortless being
Day 283 | Final Stillness | Ultimate rest
Day 284 | Peace Without Boundaries | Infinite calm
Day 285 | End of Becoming | Final freedom
Day 286 | Awareness Remains | Ever-present
Day 287 | Nothing to Add | Completion
Day 288 | Liberation Lived | Daily freedom
Day 289 | Quiet Being | Natural state
Day 290 | The End Is Here | Now
Day 291 | Perfect Simplicity | Nothing extra
Day 292 | Awareness Only | Pure presence
Day 293 | Peace Without Name | Beyond language
Day 294 | End of the Road | Journey complete
Day 295 | Living Free | Effortless liberation
Day 296 | Silent Dhamma | Wordless truth
Day 297 | No Return | Final release
Day 298 | Peace Remains | Unchanging calm
Day 299 | Awareness Without Center | Non-self realized
Day 300 | Simply Being | Ultimate teaching
Day 301 | The Path Complete | Fulfillment
Day 302 | Freedom Beyond Time | Timeless
Day 303 | The Deathless | Ultimate refuge
Day 304 | Calm Without Cause | Natural peace
Day 305 | No Becoming | End of desire
Day 306 | Awareness Alone | Pure mind
Day 307 | Nothing Missing | Complete
Day 308 | Final Peace | Nibbana
Day 309 | Living Awake | Continuous clarity
Day 310 | Silent Wisdom | Beyond thought
Day 311 | No Path No Goal | Just this
Day 312 | The End of Suffering | Liberation
Day 313 | Peace Beyond Fear | Absolute safety
Day 314 | Awareness Remains | Ever-present
Day 315 | Nothing to Hold | Empty freedom
Day 316 | End Without End | Boundless peace
Day 317 | Calm Completeness | Fulfilled being
Day 318 | No Return | Final release
Day 319 | Pure Awareness | Natural state
Day 320 | Quiet Joy | Inner happiness
Day 321 | The Deathless | Ultimate truth
Day 322 | Nothing More | Completion
Day 323 | Living Free | Effortless peace
Day 324 | Silent Completion | Path finished
Day 325 | Awareness Only | Pure presence
Day 326 | Peace Without Words | Beyond language
Day 327 | Final Stillness | Ultimate rest
Day 328 | No Becoming | End of craving
Day 329 | Calm Being | Natural mind
Day 330 | Freedom Here | Immediate liberation
Day 331 | Nothing Missing | Complete
Day 332 | Awareness Remains | Eternal clarity
Day 333 | The End Is Here | Now
Day 334 | Silent Peace | Wordless truth
Day 335 | No Return | Liberation
Day 336 | Just This | Ultimate simplicity
Day 337 | Calm Without Effort | Natural peace
Day 338 | Awareness Alone | Pure being
Day 339 | Nothing to Fix | Perfection
Day 340 | The Deathless | Nibbana
Day 341 | Peace Beyond Time | Timeless
Day 342 | Living Awake | Continuous presence
Day 343 | Silent Wisdom | Beyond doctrine
Day 344 | No Path Left | Fulfillment
Day 345 | Freedom Without Fear | Absolute safety
Day 346 | Awareness Remains | Ever-present
Day 347 | Nothing to Hold | Empty freedom
Day 348 | End of Becoming | Final peace
Day 349 | Calm Completeness | Finished path
Day 350 | Simply Being | Ultimate teaching
Day 351 | Liberation Here | Immediate freedom
Day 352 | Silent Completion | Path complete
Day 353 | Pure Awareness | Natural state
Day 354 | Peace Without Cause | Nibbana
Day 355 | No Return | Final release
Day 356 | Calm Presence | Unshakable
Day 357 | Awareness Only | Pure being
Day 358 | Nothing Missing | Complete
Day 359 | Final Peace | Ultimate calm
Day 360 | Living Free | Effortless liberation
Day 361 | Silent Wisdom | Beyond words
Day 362 | The Deathless | Ultimate refuge
Day 363 | Awareness Remains | Ever-present
Day 364 | Nothing More | Completion
Day 365 | Nibbana | The End of Suffering
`;

const parsed = RAW_TEACHINGS.trim().split("\n").map((line) => {
  const parts = line.split("|").map((p) => p.trim());
  const day = Number(parts[0].replace("Day", "").trim());
  const title = parts[1];
  const rawSummary = parts[2] || "";
  const match = rawSummary.match(/^(.*)\(([^)]+)\)$/);
  const summary = match ? match[1].trim() : rawSummary;
  const source = match ? match[2].trim() : undefined;
  return { day, title, summary, source };
});

const defaultPractice = "Take 3 slow breaths. Soften your shoulders. Notice one small thing you usually miss.";

function promptFor(title: string, summary: string) {
  return `How does “${title}” show up in your life today? What is one small, kind action you can take?`;
}

export function getDayContent(day: number): DayContent {
  const d = Math.min(Math.max(1, Math.floor(day)), 365);
  const entry = parsed[d - 1];
  const teaching = entry.source ? `${entry.summary} (${entry.source})` : entry.summary;
  return {
    day: d,
    title: entry.title,
    summary: entry.summary,
    source: entry.source,
    teaching,
    prompt: promptFor(entry.title, entry.summary),
    practice: defaultPractice,
    image: "/images/hero-buddha.png",
  };
}

export default parsed.map((entry) => getDayContent(entry.day));

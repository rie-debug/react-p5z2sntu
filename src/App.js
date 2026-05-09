// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { Plane, Coffee, Utensils, MessageSquare, RotateCcw, Home, AlertCircle, Keyboard, User, Save, History, Trash2 } from 'lucide-react';

// === データ: 各フレーズにローマ字とかな表記を追加 (各15問) ===
const CATEGORIES = [
  {
    id: 'airport',
    name: '空港 (Airport)',
    icon: Plane,
    phrases: [
      { ja: "パスポートをお願いします", en: "Passport, please.", romaji: "pasupo-to o onegaishimasu.", reading: "ぱすぽーとをおねがいします。" },
      { ja: "手荷物受取所はどこですか？", en: "Where is the baggage claim?", romaji: "tenimotsu uketorijo wa doko desuka?", reading: "てにもつうけとりじょはどこですか？" },
      { ja: "申告するものは何もありません", en: "I have nothing to declare.", romaji: "shinkokusuru mono wa nanimo arimasen.", reading: "しんこくするものはなにもありません。" },
      { ja: "搭乗券をお願いします", en: "Boarding pass, please.", romaji: "toujouken o onegaishimasu.", reading: "とうjouけんをおねがいします。" },
      { ja: "搭乗口の番号は何番ですか？", en: "What is the gate number?", romaji: "toujouguchi no bangou wa nanban desuka?", reading: "とうじょうぐちのばんごうはなんばんですか？" },
      { ja: "これが私のパスポートです", en: "Here is my passport.", romaji: "kore ga watashi no pasupo-to desu.", reading: "これがわたしのぱすぽーとです。" },
      { ja: "この便は遅れていますか？", en: "Is this flight delayed?", romaji: "kono bin wa okurete imasuka?", reading: "このびんはおくれていますか？" },
      { ja: "タクシー乗り場はどこですか？", en: "Where can I get a taxi?", romaji: "takushi- noriba wa doko desuka?", reading: "たくしーのりばはどこですか？" },
      { ja: "観光目的で来ました", en: "I am here for sightseeing.", romaji: "kankoumokuteki de kimashita.", reading: "かんこうもくてきできました。" },
      { ja: "どのくらい滞在しますか？", en: "How long will you stay?", romaji: "donokurai taizai shimasuka?", reading: "どのくらいたいざいしますか？" },
      { ja: "フライトは何時ですか？", en: "What time is the flight?", romaji: "furaito wa nanji desuka?", reading: "ふらいとはなんjiですか？" },
      { ja: "通路側の席をお願いします", en: "An aisle seat, please.", romaji: "tsuurogawa no seki o onegaishimasu.", reading: "つうろがわのせきをおねがいします。" },
      { ja: "窓側の席をお願いします", en: "A window seat, please.", romaji: "madogawa no seki o onegaishimasu.", reading: "まどがわのせきをおねがいします。" },
      { ja: "荷物はいくつありますか？", en: "How many bags do you have?", romaji: "nimotsu wa ikutsu arimasuka?", reading: "にもつはいくつありますか？" },
      { ja: "超過料金はいくらですか？", en: "How much is the excess fee?", romaji: "choukaryoukin wa ikura desuka?", reading: "ちょうかりょうきんはいくらですか？" }
    ]
  },
  {
    id: 'inflight',
    name: '機内 (In-flight)',
    icon: Coffee,
    phrases: [
      { ja: "シートベルトをお締めください", en: "Fasten your seatbelt.", romaji: "shi-toberuto o oshimekudasai.", reading: "しーとべるとをおしめください。" },
      { ja: "牛肉にしますか、鶏肉にしますか？", en: "Beef or chicken?", romaji: "gyuuniku ni shimasuka, toriniku ni shimasuka?", reading: "ぎゅうにくにしますか、とりにくにしますか？" },
      { ja: "お水をください", en: "Water, please.", romaji: "omizu o kudasai.", reading: "おみずをください。" },
      { ja: "毛布をもらえますか？", en: "Can I have a blanket?", romaji: "moufu o moraemasuka?", reading: "もうふをもらえますか？" },
      { ja: "座席をお戻しください", en: "Put your seat back up.", romaji: "zaseki o omodoshikudasai.", reading: "ざせきをおもどしください。" },
      { ja: "気分が悪いです", en: "I feel sick.", romaji: "kibun ga warui desu.", reading: "きぶんがわるいです。" },
      { ja: "コーヒーをお願いします", en: "Coffee, please.", romaji: "ko-hi- o onegaishimasu.", reading: "こーひーをおねがいします。" },
      { ja: "すみません", en: "Excuse me.", romaji: "sumimasen.", reading: "すみません。" },
      { ja: "お手洗いはどこですか？", en: "Where is the restroom?", romaji: "otearai wa doko desuka?", reading: "おてあらいはどこですか？" },
      { ja: "リンゴジュースをください", en: "Apple juice, please.", romaji: "ringoju-su o kudasai.", reading: "りんごじゅーすをください。" },
      { ja: "イヤホンをください", en: "Headphones, please.", romaji: "iyahon o kudasai.", reading: "いやほんをください。" },
      { ja: "機内食はいつ出ますか？", en: "When is the meal served?", romaji: "kinaishoku wa itsu demasuka?", reading: "きないしょくはいつでますか？" },
      { ja: "入国カードをください", en: "Landing card, please.", romaji: "nyuukokuka-do o kudasai.", reading: "にゅうこくかーどをください。" },
      { ja: "ペンを貸してもらえますか？", en: "Can I borrow a pen?", romaji: "pen o kashite moraemasuka?", reading: "ぺんをかしてもらえますか？" },
      { ja: "少し寒いです", en: "It is a little cold.", romaji: "sukoshi samui desu.", reading: "すこしさむいです。" }
    ]
  },
  {
    id: 'restaurant',
    name: 'レストラン (Restaurant)',
    icon: Utensils,
    phrases: [
      { ja: "2名です", en: "Table for two, please.", romaji: "2mei desu.", reading: "2めいです。" },
      { ja: "メニューを見せてもらえますか？", en: "May I see the menu?", romaji: "menyu- o misete moraemasuka?", reading: "めにゅーをみせてもらえますか？" },
      { ja: "これにします", en: "I will have this.", romaji: "kore ni shimasu.", reading: "これにします。" },
      { ja: "お会計をお願いします", en: "Check, please.", romaji: "okaikei o onegaishimasu.", reading: "おかいけいをおねがいします。" },
      { ja: "美味しかったです", en: "It was delicious.", romaji: "oishikatta desu.", reading: "おいしかったです。" },
      { ja: "お水をいただけますか？", en: "Can I have some water?", romaji: "omizu o itadakemasuka?", reading: "おみずをいただけますか？" },
      { ja: "おすすめは何ですか？", en: "What do you recommend?", romaji: "osusume wa nan desuka?", reading: "おすすめはなんですか？" },
      { ja: "お釣りはとっておいてください", en: "Keep the change.", romaji: "otsuri wa totte oite kudasai.", reading: "おつりはとっておいてください。" },
      { ja: "玉ねぎは抜いてください", en: "No onions, please.", romaji: "tamanegi wa nuite kudasai.", reading: "たまねぎはぬいてください。" },
      { ja: "これは辛いですか？", en: "Is this spicy?", romaji: "kore wa karai desuka?", reading: "これはからいですか？" },
      { ja: "予約しています", en: "I have a reservation.", romaji: "yoyaku shite imasu.", reading: "よやくしています。" },
      { ja: "スプーンを落としました", en: "I dropped my spoon.", romaji: "supu-n o otoshimashita.", reading: "すぷーんをおとしました。" },
      { ja: "持ち帰りにできますか？", en: "Can I get this to go?", romaji: "mochikaeri ni dekimasuka?", reading: "もちかえりにできますか？" },
      { ja: "クレジットカードは使えますか？", en: "Do you accept credit cards?", romaji: "kurejitto ka-do wa tsukaemasuka?", reading: "くれじっとかーどはつかえますか？" },
      { ja: "とても美味しかったです", en: "It was very good.", romaji: "totemo oishikatta desu.", reading: "とてもおいしかったです。" }
    ]
  },
  {
    id: 'daily',
    name: '日常 (Daily)',
    icon: MessageSquare,
    phrases: [
      { ja: "おはようございます", en: "Good morning.", romaji: "ohayou gozaimasu.", reading: "おはようございます。" },
      { ja: "お元気ですか？", en: "How are you?", romaji: "ogenki desuka?", reading: "おげんきですか？" },
      { ja: "ありがとうございます", en: "Thank you very much.", romaji: "arigatou gozaimasu.", reading: "ありがとうございます。" },
      { ja: "また後で", en: "See you later.", romaji: "mata atode.", reading: "またあとで。" },
      { ja: "良い一日を", en: "Have a nice day.", romaji: "yoi ichinichi o.", reading: "よいいちにちを。" },
      { ja: "ごめんなさい", en: "I am sorry.", romaji: "gomennasai.", reading: "ごめんなさい。" },
      { ja: "はじめまして", en: "Nice to meet you.", romaji: "hajimemashite.", reading: "はじめまして。" },
      { ja: "今何時ですか？", en: "What time is it?", romaji: "ima nanji desuka?", reading: "いまなんじですか？" },
      { ja: "わかりました", en: "I understand.", romaji: "wakarimashita.", reading: "わかりました。" },
      { ja: "後で電話してください", en: "Call me later.", romaji: "atode denwa shite kudasai.", reading: "あとででんわしてください。" },
      { ja: "お名前は何ですか？", en: "What is your name?", romaji: "onamae wa nan desuka?", reading: "おなまえはなんですか？" },
      { ja: "どこに住んでいますか？", en: "Where do you live?", romaji: "doko ni sunde imasuka?", reading: "どこにすんでいますか？" },
      { ja: "手伝ってくれますか？", en: "Can you help me?", romaji: "tetsudatte kuremasuka?", reading: "てつだってくれますか？" },
      { ja: "どういう意味ですか？", en: "What do you mean?", romaji: "douiu imi desuka?", reading: "どういういみですか？" },
      { ja: "もう一度言ってください", en: "Please say that again.", romaji: "mou ichido itte kudasai.", reading: "もういちどいってください。" }
    ]
  }
];

const KANA_MAP = {
  'あ':{key:'3'}, 'い':{key:'e'}, 'う':{key:'4'}, 'え':{key:'5'}, 'お':{key:'6'},
  'か':{key:'t'}, 'き':{key:'g'}, 'く':{key:'h'}, 'け':{key:':'}, 'こ':{key:'b'},
  'さ':{key:'x'}, 'し':{key:'d'}, 'す':{key:'r'}, 'せ':{key:'p'}, 'そ':{key:'c'},
  'た':{key:'q'}, 'ち':{key:'a'}, 'つ':{key:'z'}, 'て':{key:'w'}, 'と':{key:'s'},
  'な':{key:'u'}, 'に':{key:'i'}, 'ぬ':{key:'1'}, 'ね':{key:','}, 'の':{key:'k'},
  'は':{key:'f'}, 'ひ':{key:'v'}, 'ふ':{key:'2'}, 'へ':{key:'^'}, 'ほ':{key:'-'},
  'ま':{key:'j'}, 'み':{key:'n'}, 'む':{key:']'}, 'め':{key:'/'}, 'も':{key:'m'},
  'や':{key:'7'}, 'ゆ':{key:'8'}, 'よ':{key:'9'},
  'ら':{key:'o'}, 'り':{key:'l'}, 'る':{key:'.'}, 'れ':{key:';'}, 'ろ':{key:'\\'},
  'わ':{key:'0'}, 'ん':{key:'y'}, 'ー':{key:'\\', accept:['¥', '-']}, '、':{key:','}, '。':{key:'.'}, '？':{key:'?', requiresShift:true},
  'を':{key:'0', requiresShift:true},
  'ぁ':{key:'#', requiresShift:true}, 'ぃ':{key:'E', requiresShift:true}, 'ぅ':{key:'$', requiresShift:true}, 'ぇ':{key:'%', requiresShift:true}, 'ぉ':{key:'&', requiresShift:true},
  'ゃ':{key:'\'', requiresShift:true}, 'ゅ':{key:'(', requiresShift:true}, 'ょ':{key:')', requiresShift:true}, 'っ':{key:'Z', requiresShift:true}
};
const DAKUTEN_MAP = { 'が':'か', 'ぎ':'き', 'ぐ':'く', 'げ':'け', 'ご':'こ', 'ざ':'さ', 'じ':'し', 'ず':'す', 'ぜ':'せ', 'ぞ':'そ', 'だ':'た', 'ぢ':'ち', 'づ':'つ', 'で':'て', 'ど':'と', 'ば':'は', 'び':'ひ', 'ぶ':'ふ', 'べ':'へ', 'ぼ':'ほ' };
const HANDAKUTEN_MAP = { 'ぱ':'は', 'ぴ':'ひ', 'ぷ':'ふ', 'ぺ':'へ', 'ぽ':'ほ' };

const getFingerForChar = (char) => {
  if (!char) return null;
  const lowerChar = char.toLowerCase();
  if (char === ' ') return { name: '親指', hand: 'どちらかの', id: '親指' };
  if ('1qaz!z'.includes(lowerChar)) return { name: '小指', hand: '左手', id: '左手・小指' };
  if ('2wsx@'.includes(lowerChar)) return { name: '薬指', hand: '左手', id: '左手・薬指' };
  if ('3edc#e'.includes(lowerChar)) return { name: '中指', hand: '左手', id: '左手・中指' };
  if ('45rtfgvb$%'.includes(lowerChar)) return { name: '人差し指', hand: '左手', id: '左手・人差し指' };
  if ('67yuhjnm^&'.includes(lowerChar)) return { name: '人差し指', hand: '右手', id: '右手・人差し指' };
  if ('8ik,.*<'.includes(lowerChar)) return { name: '中指', hand: '右手', id: '右手・中指' };
  if ('9ol.>( '.includes(lowerChar)) return { name: '薬指', hand: '右手', id: '右手・薬指' };
  if ('0p;/-_=+[]{}\\|:\'"?!~¥'.includes(lowerChar)) return { name: '小指', hand: '右手', id: '右手・小指' };
  return { name: '小指', hand: '右手', id: '右手・小指' };
};

const HandGuide = ({ targetFingerId }) => {
  const getColor = (id) => {
    if (targetFingerId === '親指' && id === '親指') return 'fill-sky-400';
    return targetFingerId === id ? 'fill-sky-400' : 'fill-slate-200';
  };
  return (
    <div className="flex gap-4 sm:gap-8 items-center justify-center">
      <svg viewBox="0 0 100 120" className="w-20 h-24 sm:w-24 sm:h-28">
        <rect x="10" y="45" width="14" height="30" rx="7" className={`transition-colors duration-200 ${getColor('左手・小指')}`} />
        <rect x="26" y="25" width="14" height="50" rx="7" className={`transition-colors duration-200 ${getColor('左手・薬指')}`} />
        <rect x="42" y="15" width="14" height="60" rx="7" className={`transition-colors duration-200 ${getColor('左手・中指')}`} />
        <rect x="58" y="25" width="14" height="50" rx="7" className={`transition-colors duration-200 ${getColor('左手・人差し指')}`} />
        <rect x="62" y="55" width="30" height="14" rx="7" transform="rotate(40 62 62)" className={`transition-colors duration-200 ${getColor('親指')}`} />
        <rect x="10" y="60" width="62" height="45" rx="12" className="fill-slate-200" />
      </svg>
      <svg viewBox="0 0 100 120" className="w-20 h-24 sm:w-24 sm:h-28">
        <rect x="28" y="25" width="14" height="50" rx="7" className={`transition-colors duration-200 ${getColor('右手・人差し指')}`} />
        <rect x="44" y="15" width="14" height="60" rx="7" className={`transition-colors duration-200 ${getColor('右手・中指')}`} />
        <rect x="60" y="25" width="14" height="50" rx="7" className={`transition-colors duration-200 ${getColor('右手・薬指')}`} />
        <rect x="76" y="45" width="14" height="30" rx="7" className={`transition-colors duration-200 ${getColor('右手・小指')}`} />
        <rect x="8" y="55" width="30" height="14" rx="7" transform="rotate(-40 38 62)" className={`transition-colors duration-200 ${getColor('親指')}`} />
        <rect x="28" y="60" width="62" height="45" rx="12" className="fill-slate-200" />
      </svg>
    </div>
  );
};

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [gameState, setGameState] = useState('start');
  const [inputMode, setInputMode] = useState('english');
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const [phrases, setPhrases] = useState([]);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [targets, setTargets] = useState([]);
  
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [missedFingers, setMissedFingers] = useState({});
  const [isError, setIsError] = useState(false);
  const errorTimeoutRef = useRef(null);

  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'icon';
    link.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⌨️</text></svg>';
    document.getElementsByTagName('head')[0].appendChild(link);
    document.title = "Minimal Typing";
  }, []);

  const [myRecords, setMyRecords] = useState(() => {
    try {
      const saved = localStorage.getItem('minimalTypingRecords');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  const [inputName, setInputName] = useState(() => {
    return localStorage.getItem('minimalTypingName') || 'ゲストタイパー';
  });

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('minimalTypingName', inputName.trim());
    alert("保存しました！");
  };

  const clearRecords = () => {
    if (window.confirm("全記録を消去しますか？")) {
      localStorage.removeItem('minimalTypingRecords');
      setMyRecords([]);
    }
  };

  const saveResult = (wpmScore, accuracyScore, missCount, timeSec, mode) => {
    const newRecord = {
      id: Date.now().toString(),
      wpm: wpmScore,
      accuracy: accuracyScore,
      misses: missCount,
      time: timeSec,
      mode: mode,
      date: Date.now(),
      category: selectedCategory
    };
    const updated = [newRecord, ...myRecords];
    setMyRecords(updated);
    localStorage.setItem('minimalTypingRecords', JSON.stringify(updated));
  };

  const startPlay = (categoryId) => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    const shuffled = [...category.phrases].sort(() => 0.5 - Math.random()).slice(0, 10);
    setPhrases(shuffled);
    setSelectedCategory(categoryId);
    setPhraseIndex(0);
    setCharIndex(0);
    setHasStartedTyping(false);
    setCorrectCount(0);
    setMistakeCount(0);
    setMissedFingers({});
    setGameState('playing');
  };

  useEffect(() => {
    if (gameState !== 'playing' || phrases.length === 0) return;
    const phrase = phrases[phraseIndex];
    let newTargets = [];
    if (inputMode === 'english') {
      newTargets = phrase.en.split('').map(c => ({ key: c, displayChar: c, requiresShift: /[A-Z!@#$%^&*()_+{}|:"<>?]/.test(c) }));
    } else if (inputMode === 'romaji') {
      newTargets = phrase.romaji.split('').map(c => ({ key: c, displayChar: c, requiresShift: /[A-Z!@#$%^&*()_+{}|:"<>?]/.test(c) }));
    } else if (inputMode === 'kana') {
      for (let char of phrase.reading) {
        if (DAKUTEN_MAP[char]) {
          newTargets.push({ ...KANA_MAP[DAKUTEN_MAP[char]], displayChar: DAKUTEN_MAP[char] });
          newTargets.push({ key: '@', displayChar: '゛', requiresShift: false });
        } else if (HANDAKUTEN_MAP[char]) {
          newTargets.push({ ...KANA_MAP[HANDAKUTEN_MAP[char]], displayChar: HANDAKUTEN_MAP[char] });
          newTargets.push({ key: '[', displayChar: '゜', requiresShift: false });
        } else if (KANA_MAP[char]) {
          newTargets.push({ ...KANA_MAP[char], displayChar: char });
        } else {
          newTargets.push({ key: char, displayChar: char, requiresShift: false });
        }
      }
    }
    setTargets(newTargets);
  }, [phraseIndex, phrases, gameState, inputMode]);

  useEffect(() => {
    if (gameState !== 'playing' || currentTab !== 'home') return;
    const handleKeyDown = (e) => {
      if (e.key.length !== 1) return;
      e.preventDefault();
      if (!hasStartedTyping) { setHasStartedTyping(true); setStartTime(Date.now()); }
      const target = targets[charIndex];
      if (!target) return;
      
      const isMatch = e.key === target.key || (target.accept && target.accept.includes(e.key));
      
      if (isMatch) {
        setIsError(false);
        setCorrectCount(c => c + 1);
        if (charIndex + 1 === targets.length) {
          if (phraseIndex + 1 === phrases.length) {
            const end = Date.now();
            setEndTime(end);
            const time = (end - startTime) / 1000;
            const wpm = Math.round(((correctCount+1) / 5) / (time / 60));
            const acc = (((correctCount+1) / (correctCount+1 + mistakeCount)) * 100).toFixed(1);
            saveResult(wpm, parseFloat(acc), mistakeCount, time, inputMode);
            setGameState('result');
          } else { setPhraseIndex(p => p + 1); setCharIndex(0); }
        } else { setCharIndex(idx => idx + 1); }
      } else {
        setMistakeCount(m => m + 1);
        const finger = getFingerForChar(target.key);
        if (finger) setMissedFingers(prev => ({ ...prev, [finger.id]: (prev[finger.id] || 0) + 1 }));
        setIsError(true);
        if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
        errorTimeoutRef.current = setTimeout(() => setIsError(false), 150);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, currentTab, hasStartedTyping, targets, charIndex]);

  const timeSeconds = (endTime - startTime) / 1000;
  const wpm = Math.round((correctCount / 5) / (timeSeconds / 60)) || 0;
  const accuracy = correctCount + mistakeCount > 0 ? ((correctCount / (correctCount + mistakeCount)) * 100).toFixed(1) : 0;
  const getWeakFinger = () => {
    const keys = Object.keys(missedFingers);
    if (keys.length === 0) return null;
    const weakId = keys.reduce((a, b) => missedFingers[a] > missedFingers[b] ? a : b);
    return { id: weakId, count: missedFingers[weakId] };
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 sm:p-8 font-sans text-slate-800">
      <header className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between border-b border-slate-200 pb-4 mb-8">
        <h1 className="text-xl font-light text-slate-700 tracking-[0.2em] uppercase flex items-center gap-2 cursor-pointer mb-4 sm:mb-0" onClick={() => { setGameState('start'); setCurrentTab('home'); }}>
          <Keyboard className="w-6 h-6 text-sky-500" /> Minimal Typing
        </h1>
        <div className="flex gap-2 bg-slate-100 p-1.5 rounded-lg border border-slate-200">
          <button onClick={() => { setGameState('start'); setCurrentTab('home'); }} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${currentTab==='home' ? 'bg-white shadow-sm text-sky-600' : 'text-slate-500'}`}><Home className="w-4 h-4 inline mr-1"/>プレイ</button>
          <button onClick={() => setCurrentTab('profile')} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${currentTab==='profile' ? 'bg-white shadow-sm text-sky-600' : 'text-slate-500'}`}><User className="w-4 h-4 inline mr-1"/>マイページ</button>
        </div>
      </header>

      <div className="w-full max-w-3xl flex-1">
        {currentTab === 'home' && (
          <>
            {gameState === 'start' && (
              <div className="animate-fade-in">
                <div className="flex gap-3 justify-center mb-8 bg-slate-200/50 p-2 rounded-xl w-max mx-auto border border-slate-200">
                  {['english', 'romaji', 'kana'].map(mode => (
                    <button key={mode} onClick={() => setInputMode(mode)} className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${inputMode === mode ? 'bg-sky-600 text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-50'}`}>
                      {mode === 'english' ? 'English (英字)' : mode === 'romaji' ? 'ローマ字' : 'かな入力'}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CATEGORIES.map(cat => {
                    const Icon = cat.icon;
                    return (
                      <button key={cat.id} onClick={() => startPlay(cat.id)} className="p-8 bg-white border-2 border-slate-100 hover:border-sky-500 hover:bg-sky-600 hover:text-white rounded-xl shadow-sm hover:shadow-lg transition-all group flex flex-col items-center gap-4">
                        <Icon className="w-8 h-8 text-sky-500 group-hover:text-white transition-colors" />
                        <span className="font-bold tracking-wide">{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-8 text-center text-xs text-slate-400 bg-slate-100 py-3 rounded-lg border border-slate-200">※キーボードを「半角英数（直接入力）」にしてから始めてください。</div>
              </div>
            )}

            {gameState === 'playing' && (
              <div className="bg-white p-6 sm:p-10 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center min-h-[420px] relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 bg-sky-500 transition-all" style={{ width: `${(phraseIndex / phrases.length) * 100}%` }} />
                <div className="text-xs text-slate-400 mb-6 font-bold tracking-widest uppercase">{CATEGORIES.find(c => c.id === selectedCategory)?.name} - {phraseIndex + 1} / 10</div>
                <div className="text-xl text-slate-700 mb-8 font-medium text-center">{phrases[phraseIndex].ja}</div>
                <div className="flex flex-wrap justify-center items-end gap-y-6 gap-x-[2px] mb-8 select-none w-full">
                  {targets.map((t, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      {inputMode === 'kana' && <span className={`text-[12px] h-5 font-bold ${idx < charIndex ? 'text-slate-200' : 'text-slate-400'}`}>{t.displayChar !== ' ' ? t.displayChar : ''}</span>}
                      <span className={`text-3xl font-mono px-[2px] rounded transition-colors relative ${idx < charIndex ? 'text-slate-200' : idx === charIndex ? (isError ? 'bg-rose-100 text-rose-600' : 'bg-sky-100 text-sky-800') : 'text-slate-700'}`}>
                        {t.key === ' ' ? '␣' : (inputMode === 'kana' ? (t.key === '\\' ? '¥ / \\' : t.key.toUpperCase()) : t.displayChar)}
                        {idx === charIndex && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-sky-500 animate-pulse" />}
                      </span>
                    </div>
                  ))}
                </div>
                <div className={`mt-2 transition-opacity ${hasStartedTyping ? 'opacity-100' : 'opacity-0'}`}>
                  <HandGuide targetFingerId={getFingerForChar(targets[charIndex]?.key)?.id} />
                  <div className="mt-4 text-center min-h-[24px]">
                    {targets[charIndex]?.requiresShift && <span className="text-xs bg-amber-100 px-3 py-1 rounded text-amber-700 border border-amber-200 font-bold">+ Shift キー</span>}
                    {targets[charIndex]?.key === ' ' && <span className="text-xs text-sky-600 font-bold">スペースキーを叩いてください</span>}
                  </div>
                </div>
                {!hasStartedTyping && <div className="absolute bottom-8 text-xs text-sky-500 font-bold animate-pulse tracking-widest">TYPE TO START</div>}
              </div>
            )}

            {gameState === 'result' && (
              <div className="bg-white p-10 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center animate-fade-in">
                <h2 className="text-xl font-light text-slate-700 mb-2 tracking-[0.1em] uppercase">Result</h2>
                <div className="grid grid-cols-2 gap-x-12 gap-y-8 mb-12 w-full max-w-sm mt-8">
                  <div className="text-center"><div className="text-4xl font-mono text-slate-800 mb-1">{wpm}</div><div className="text-xs text-slate-400 uppercase">WPM</div></div>
                  <div className="text-center"><div className="text-4xl font-mono text-slate-800 mb-1">{accuracy}%</div><div className="text-xs text-slate-400 uppercase">Accuracy</div></div>
                </div>
                {getWeakFinger() && (
                  <div className="mb-10 w-full max-w-sm bg-amber-50 border border-amber-100 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-700">今回は <strong>{getWeakFinger().id}</strong> のミスが多めでした（{getWeakFinger().count}回）。意識してみましょう！</p>
                  </div>
                )}
                <div className="flex gap-4 w-full max-w-sm">
                  <button onClick={() => startPlay(selectedCategory)} className="flex-1 py-4 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700 transition-colors flex justify-center items-center gap-2"><RotateCcw className="w-4 h-4"/>Retry</button>
                  <button onClick={() => setGameState('start')} className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 transition-colors flex justify-center items-center gap-2"><Home className="w-4 h-4"/>Home</button>
                </div>
              </div>
            )}
          </>
        )}

        {currentTab === 'profile' && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 animate-fade-in">
            <h2 className="text-2xl font-light text-slate-700 mb-8 tracking-[0.1em] flex items-center gap-3"><User className="w-6 h-6 text-sky-500" />マイページ</h2>
            <div className="mb-10 bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h3 className="text-sm font-bold text-slate-600 mb-4">ユーザー名の設定</h3>
              <form onSubmit={handleUpdateProfile} className="flex gap-3">
                <input type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} maxLength={15} className="flex-1 px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-sky-500 outline-none" />
                <button type="submit" className="px-6 py-2 bg-slate-800 text-white font-bold rounded-md hover:bg-slate-700">保存</button>
              </form>
            </div>
            <div className="flex justify-between items-center mb-4"><h3 className="text-sm font-bold text-slate-600">履歴</h3>{myRecords.length > 0 && <button onClick={clearRecords} className="text-xs text-rose-500 font-bold hover:underline">全消去</button>}</div>
            <div className="bg-slate-50 rounded-lg border border-slate-200 max-h-[300px] overflow-y-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-100 text-slate-500 sticky top-0"><tr><th className="p-3">日時</th><th className="p-3">モード</th><th className="p-3 text-right">WPM</th></tr></thead>
                <tbody>
                  {myRecords.map(r => (
                    <tr key={r.id} className="border-b border-slate-100 last:border-0 hover:bg-white"><td className="p-3 text-xs text-slate-500">{new Date(r.date).toLocaleString()}</td><td className="p-3">{r.mode==='english'?'英字':r.mode==='romaji'?'ローマ字':'かな'}</td><td className="p-3 text-right font-mono font-bold text-sky-700">{r.wpm}</td></tr>
                  ))}
                  {myRecords.length === 0 && <tr><td colSpan="3" className="p-8 text-center text-slate-400">記録がありません</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <footer className="w-full text-center py-6 mt-auto">
        <p className="text-xs text-slate-400 font-medium tracking-wider">
          &copy; {new Date().getFullYear()} ch_procreate_ipad. All rights reserved.
        </p>
      </footer>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
      `}} />
    </div>
  );
}

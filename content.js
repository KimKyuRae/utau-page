const contributorPeople = [
  "SapoKR",
  "Sukje",
  "CriticizedOnion",
  "Ra_TanG",
  "choshinyoung",
  "LAVEN",
  "unsigned",
  "crafthome",
];

const contributorRoleLabels = {
  ko: [
    "VA, 이름",
    "나이",
    "종족, 좋아하는 나라, 좋아하는 반찬",
    "키, 몸무게",
    "생일",
    "좋아하는 거",
    "잘하는 일",
    "서투른 일",
  ],
  en: [
    "VA, Name",
    "Age",
    "Species, Favorite Country, Favorite Side Dish",
    "Height / Weight",
    "Birthday",
    "Likes",
    "Good At",
    "Not Good At",
  ],
  ja: [
    "VA, 名前",
    "年齢",
    "種族, 好きな国, 好きなおかず",
    "身長, 体重",
    "誕生日",
    "好きなもの",
    "得意なこと",
    "苦手なこと",
  ],
};

const contributorLinks = {
  SapoKR: "https://x.com/Developer_Sapo",
  Sukje: "  ",
  CriticizedOnion: "https://x.com/CriticizedOnion",
  Ra_TanG: "https://x.com/Ra_TanG1234",
  choshinyoung: "https://github.com/choshinyoung",
  LAVEN: "https://github.com/L4VEN",
  unsigned: "",
  crafthome: "",
};

function buildContributors(locale) {
  const roles = contributorRoleLabels[locale] || contributorRoleLabels.ko;
  return contributorPeople.map((name, index) => ({
    role: roles[index] || "",
    name,
    link: contributorLinks[name] || "",
  }));
}

function buildContact(primaryText) {
  return {
    sectionLabel: "CONTACT",
    primaryText,
    primaryUrl: "mailto:utau@sapo.dev",
    channels: [
      { label: "X", value: "@KokunoTetsu", url: "https://x.com/KokunoTetsu" },
      { label: "YouTube", value: "@tarrara163", url: "https://www.youtube.com/@tarrara163" },
      { label: "Email", value: "utau@sapo.dev" },
    ],
  };
}

function buildCredit(locale, title, description, driveTitle, driveLabel, mediafireLabel, notes) {
  return {
    title,
    description,
    contributors: buildContributors(locale),
    primaryAction: {
      title: driveTitle,
      label: driveLabel,
      url: "https://drive.google.com/file/d/15ICVCWsRLs4acea4R8QK-2Dfw0mtnY0j/view?usp=sharing",
    },
    secondaryAction: {
      label: mediafireLabel,
      url: "https://www.mediafire.com/file/cccnocs051l6grf/Kokuno_Tetsu_JA_VCV.zip/file",
    },
    notes,
  };
}

function buildFooter(creditsLabel, downloadLabel) {
  return {
    metaText: "2026 Tetsu Kokuno",
    links: [
      { label: "Contact", url: "https://x.com/KokunoTetsu" },
      { label: "About", url: "#profile" },
      { label: creditsLabel, url: "#credit" },
      { label: downloadLabel, url: "#credit" },
    ],
  };
}

window.siteContent = {
  ko: {
    hero: {
      label: "VCV 보이스뱅크 배포",
      name: "Tetsu Kokuno",
      tagline: "가볍고 밝은 여자 목소리 톤의 UTAU VCV 음원",
      intro:
        "코쿠노 테츠는 가볍고 맑은 여자 음색을 중심으로 제작된 UTAU VCV 음원입니다. 발음 연결이 자연스럽고 발성이 부드럽게 이어져, 귀엽고 경쾌한 곡부터 밝은 팝 스타일 커버까지 안정적으로 사용할 수 있도록 구성했습니다.",
      facts: ["147cm / 98kg", "간장게장 선호", "구글 드라이브 다운로드"],
      buttonProfile: "프로필 보기",
      buttonDownload: "다운로드로 이동",
    },
    ui: {
      statusLabel: "현재 상태",
      profileSection: "메인 프로필",
      dossierLabel: "상세 정보",
      downloadSection: "제작 및 배포",
      creditToggleOpen: "크레딧 펼치기",
      creditToggleClose: "크레딧 접기",
      creditLabel: "기여자",
      driveLabel: "구글 드라이브",
      notesLabel: "이용 및 표기",
    },
    profile: {
      status: "배포 중",
      name: "코쿠노 테츠",
      type: "VCV 음원",
      summary: "\"내 목소리는 녹슬지 않아\"",
      tags: [],
      portraitImage: "assets/Illust.png",
      portraitFallback: "TETSU",
      stats: [
        { label: "이름", value: "코쿠노 테츠" },
        { label: "나이", value: "5000살" },
        { label: "키 / 몸무게", value: "147cm / 98kg" },
        { label: "생일", value: "5월 29일" },
      ],
      dossier: [
        { label: "종족", value: "코끼리" },
        { label: "좋아하는 나라", value: "우즈베키스탄" },
        { label: "좋아하는 거", value: "간장게장" },
        { label: "싫어하는 거", value: "산소" },
        { label: "잘하는 일", value: "삑사리 내기" },
        { label: "서투른 일", value: "구구단 외우기" },
        { label: "좋아하는 반찬", value: "고사리나물" },
      ],
    },
    contact: buildContact("문의 및 소식"),
    credit: buildCredit(
      "ko",
      "제작 및 기여",
      "코쿠노 테츠(虚空の 鉄)의 캐릭터 설정과 보이스뱅크 제작에 참여해주신 분들입니다.",
      "보이스뱅크 다운로드",
      "드라이브에서 다운로드",
      "MediaFire에서 다운로드",
      [
        "2차 창작 및 상업적 이용 규정은 동봉된 readme.txt를 참고해주세요.",
        "음원 사용 시 '코쿠노 테츠' 혹은 관련 크레딧을 표기해주시면 감사하겠습니다.",
      ]
    ),
    footer: buildFooter("Credits", "Download"),
  },

  en: {
    hero: {
      label: "Single Voicebank Distribution",
      name: "Tetsu Kokuno",
      tagline: "A light female-style UTAU VCV voicebank with a clear tone",
      intro:
        "Tetsu Kokuno is a UTAU VCV voicebank designed around a light, bright female vocal color. With smoother phoneme transitions and soft articulation, it works well for cute and energetic songs as well as clean pop-style covers.",
      facts: ["147cm / 98kg", "Likes Soy Sauce Crab", "Google Drive Download"],
      buttonProfile: "View Profile",
      buttonDownload: "Go to Download",
    },
    ui: {
      statusLabel: "CURRENT STATUS",
      profileSection: "PROFILE",
      dossierLabel: "DOSSIER",
      downloadSection: "CREDIT & DOWNLOAD",
      creditToggleOpen: "Show Credits",
      creditToggleClose: "Hide Credits",
      creditLabel: "CONTRIBUTORS",
      driveLabel: "GOOGLE DRIVE",
      notesLabel: "NOTES",
    },
    profile: {
      status: "Available Now",
      name: "Tetsu Kokuno",
      type: "VCV Voicebank",
      summary: "\"My voice never rusts\"",
      tags: [],
      portraitImage: "assets/Illust.png",
      portraitFallback: "TETSU",
      stats: [
        { label: "Name", value: "Tetsu Kokuno" },
        { label: "Age", value: "5000 years old" },
        { label: "Height / Weight", value: "147cm / 98kg" },
        { label: "Birthday", value: "May 29th" },
      ],
      dossier: [
        { label: "Species", value: "Elephant" },
        { label: "Favorite Country", value: "Uzbekistan" },
        { label: "Likes", value: "Soy Sauce Marinated Crab" },
        { label: "Dislikes", value: "Oxygen" },
        { label: "Good At", value: "Voice cracking" },
        { label: "Bad At", value: "Multiplication tables" },
        { label: "Favorite side dish", value: "Bracken fern" },
      ],
    },
    contact: buildContact("Get in touch"),
    credit: buildCredit(
      "en",
      "Credits & Contribution",
      "People who participated in the character setting and voicebank production of Tetsu Kokuno.",
      "Voicebank Download",
      "Download from Drive",
      "Download from MediaFire",
      [
        "Please refer to the included readme.txt for derivative works and commercial use rules.",
        "We would appreciate it if you could credit 'Tetsu Kokuno' when using the voicebank.",
      ]
    ),
    footer: buildFooter("Credits", "Download"),
  },

  ja: {
    hero: {
      label: "単独音源配布",
      name: "Tetsu Kokuno",
      tagline: "軽く明るい女性的な声質を活かしたUTAU VCV音源",
      intro:
        "虚空の鉄は、軽く澄んだ女性寄りの声色をベースにしたUTAU VCV音源です。音のつながりが自然でやわらかく、かわいい雰囲気の曲や明るいポップ系カバーで使いやすいように設計しています。",
      facts: ["147cm / 98kg", "カンジャンケジャン好き", "Google Drive ダウンロード"],
      buttonProfile: "プロフィールを見る",
      buttonDownload: "ダウンロードへ",
    },
    ui: {
      statusLabel: "現在のステータス",
      profileSection: "プロフィール",
      dossierLabel: "詳細情報",
      downloadSection: "クレジット＆ダウンロード",
      creditToggleOpen: "クレジットを表示",
      creditToggleClose: "クレジットを閉じる",
      creditLabel: "貢献者",
      driveLabel: "Google Drive",
      notesLabel: "利用規約",
    },
    profile: {
      status: "配布中",
      name: "虚空の 鉄",
      type: "VCV音源",
      summary: "「俺の声は錆びない」",
      tags: [],
      portraitImage: "assets/Illust.png",
      portraitFallback: "TETSU",
      stats: [
        { label: "名前", value: "虚空の 鉄" },
        { label: "年齢", value: "5000歳" },
        { label: "身長 / 体重", value: "147cm / 98kg" },
        { label: "誕生日", value: "5月29日" },
      ],
      dossier: [
        { label: "種族", value: "象" },
        { label: "好きな国", value: "ウズベキスタン" },
        { label: "好きなもの", value: "カンジャンケジャン" },
        { label: "嫌いなもの", value: "酸素" },
        { label: "得意なこと", value: "裏声を出すこと" },
        { label: "苦手なこと", value: "九九を覚えること" },
        { label: "好きなおかず", value: "シダのハーブ" },
      ],
    },
    contact: buildContact("お問い合わせ"),
    credit: buildCredit(
      "ja",
      "制作・クレジット",
      "虚空の鉄のキャラクター設定と音声ライブラリ制作に参加していただいた方々です。",
      "音源ダウンロード",
      "Driveからダウンロード",
      "MediaFireからダウンロード",
      [
        "二次創作や商用利用に関する規定は、同梱のreadme.txtをご確認ください。",
        "音源を使用する際は「虚空の鉄」または関連クレジットを表記していただけると幸いです。",
      ]
    ),
    footer: buildFooter("クレジット", "ダウンロード"),
  },
};

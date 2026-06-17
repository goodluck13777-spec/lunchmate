export const NAV = [
  { to: '/', label: '홈' },
  { to: '/dating', label: '소개팅' },
  { to: '/group', label: '그룹 미팅' },
  { to: '/ai', label: 'AI 매칭' },
  { to: '/places', label: '장소 추천' },
  { to: '/reviews', label: '후기' },
]

export const MBTI_LIST = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
]

export const INTERESTS = [
  '카페투어', '맛집탐방', '러닝', '헬스', '와인', '전시·미술',
  '영화', '여행', '캠핑', '독서', '재즈', '베이킹',
  '보드게임', '테니스', '클라이밍', '반려동물', '드라이브', '사진',
]

export const DATE_STYLES = ['리드형', '다정한 케어형', '유머러스', '차분한 경청형', '솔직 직진형', '느긋한 마이페이스']

export type Mate = {
  id: number
  name: string
  age: number
  job: string
  type: '직장인' | '학생'
  mbti: string
  area: string
  emoji: string
  gradient: string
  interests: string[]
  bio: string
  match: number
  smoke: boolean
  drink: string
}

export const MATES: Mate[] = [
  {
    id: 1, name: '지우', age: 28, job: 'UX 디자이너', type: '직장인', mbti: 'ENFP', area: '성수',
    emoji: '🌷', gradient: 'from-coral-400 to-sunset-500',
    interests: ['전시·미술', '카페투어', '재즈'], bio: '주말엔 성수 골목 카페를 정처 없이 걸어요.',
    match: 96, smoke: false, drink: '가끔',
  },
  {
    id: 2, name: '도윤', age: 31, job: '백엔드 개발자', type: '직장인', mbti: 'INTJ', area: '판교',
    emoji: '🏔️', gradient: 'from-grape-400 to-coral-400',
    interests: ['캠핑', '러닝', '와인'], bio: '계획적인 여행과 즉흥적인 드라이브를 둘 다 좋아해요.',
    match: 91, smoke: false, drink: '즐겨요',
  },
  {
    id: 3, name: '서연', age: 25, job: '대학원생', type: '학생', mbti: 'INFJ', area: '신촌',
    emoji: '📚', gradient: 'from-sunset-400 to-coral-500',
    interests: ['독서', '영화', '베이킹'], bio: '비 오는 날 빵 굽고 영화 보는 게 최고의 데이트.',
    match: 89, smoke: false, drink: '가끔',
  },
  {
    id: 4, name: '하준', age: 29, job: '마케터', type: '직장인', mbti: 'ESFP', area: '강남',
    emoji: '🎧', gradient: 'from-coral-500 to-grape-500',
    interests: ['맛집탐방', '테니스', '여행'], bio: '새로운 맛집 발굴이 취미. 같이 도장깨기 할 사람!',
    match: 87, smoke: false, drink: '즐겨요',
  },
  {
    id: 5, name: '유나', age: 27, job: '약사', type: '직장인', mbti: 'ISFJ', area: '잠실',
    emoji: '🐶', gradient: 'from-sunset-500 to-coral-400',
    interests: ['반려동물', '러닝', '사진'], bio: '강아지 산책 메이트이자 러닝 크루 모집 중이에요.',
    match: 84, smoke: false, drink: '안 해요',
  },
  {
    id: 6, name: '시현', age: 26, job: '디자인 전공생', type: '학생', mbti: 'ENTP', area: '홍대',
    emoji: '🎨', gradient: 'from-grape-500 to-sunset-400',
    interests: ['전시·미술', '보드게임', '재즈'], bio: '전시 보고 와인 한 잔, 그리고 끝없는 수다.',
    match: 82, smoke: false, drink: '가끔',
  },
]

export type GroupRoom = {
  id: number
  size: '3:3' | '4:4' | '5:5' | '6:6'
  title: string
  area: string
  time: string
  filledM: number
  filledF: number
  vibe: string
  host: string
  emoji: string
}

export const GROUP_ROOMS: GroupRoom[] = [
  { id: 1, size: '3:3', title: '성수 와인바 캐주얼 미팅', area: '성수', time: '금 19:30', filledM: 3, filledF: 2, vibe: '와인·대화', host: '민지', emoji: '🍷' },
  { id: 2, size: '4:4', title: '강남 브런치 점심팟', area: '강남', time: '토 12:00', filledM: 2, filledF: 4, vibe: '브런치·낮술', host: '준호', emoji: '🥐' },
  { id: 3, size: '3:3', title: '판교 직장인 퇴근 모임', area: '판교', time: '수 19:00', filledM: 1, filledF: 2, vibe: '맥주·수다', host: '예린', emoji: '🍻' },
  { id: 4, size: '5:5', title: '홍대 보드게임 미팅', area: '홍대', time: '토 18:00', filledM: 5, filledF: 3, vibe: '보드게임', host: '태현', emoji: '🎲' },
  { id: 5, size: '3:3', title: '잠실 러닝 후 카페', area: '잠실', time: '일 09:00', filledM: 2, filledF: 3, vibe: '러닝·카페', host: '소율', emoji: '🏃' },
  { id: 6, size: '6:6', title: '연남 루프탑 대규모 미팅', area: '연남', time: '금 20:00', filledM: 4, filledF: 4, vibe: '루프탑·칵테일', host: '재민', emoji: '🌆' },
]

export type Place = {
  id: number
  name: string
  category: '제휴 카페' | '브런치' | '레스토랑'
  area: string
  emoji: string
  gradient: string
  tag: string
  perk: string
  rating: number
}

export const PLACES: Place[] = [
  { id: 1, name: '아우어 베이커리 성수', category: '브런치', area: '성수', emoji: '🥐', gradient: 'from-sunset-400 to-coral-400', tag: '햇살 좋은 통창', perk: '시그니처 디저트 1+1', rating: 4.9 },
  { id: 2, name: '포인트 오브 뷰', category: '제휴 카페', area: '성수', emoji: '☕', gradient: 'from-coral-300 to-grape-400', tag: '감성 문구 카페', perk: '음료 20% 할인', rating: 4.8 },
  { id: 3, name: '르 챔버 라운지', category: '레스토랑', area: '강남', emoji: '🍽️', gradient: 'from-grape-400 to-coral-500', tag: '프라이빗 코스', perk: '웰컴 샴페인 제공', rating: 4.9 },
  { id: 4, name: '소소한 풍경', category: '제휴 카페', area: '연남', emoji: '🌿', gradient: 'from-sunset-500 to-coral-300', tag: '초록 가득 정원', perk: '디저트 플레이트 증정', rating: 4.7 },
  { id: 5, name: '브런치 앤 모어', category: '브런치', area: '판교', emoji: '🍳', gradient: 'from-coral-400 to-sunset-500', tag: '직장인 점심 명소', perk: '점심세트 15% 할인', rating: 4.6 },
  { id: 6, name: '문 라이트 다이닝', category: '레스토랑', area: '잠실', emoji: '🌙', gradient: 'from-grape-500 to-coral-400', tag: '야경 뷰 다이닝', perk: '2인 디저트 무료', rating: 4.8 },
]

export type Review = {
  id: number
  couple: string
  area: string
  emoji: string
  gradient: string
  title: string
  body: string
  tags: string[]
  days: number
}

export const REVIEWS: Review[] = [
  {
    id: 1, couple: '지우 ♥ 도윤', area: '성수', emoji: '💑', gradient: 'from-coral-400 to-grape-400',
    title: '점심 한 끼가 인연이 됐어요', days: 214,
    body: 'AI 매칭 점수 96%는 진짜였어요. 첫 점심부터 대화가 끊기질 않았고, 추천받은 카페 분위기도 완벽했어요.',
    tags: ['점심소개팅', 'AI매칭', '성수'],
  },
  {
    id: 2, couple: '하준 ♥ 유나', area: '강남', emoji: '🥂', gradient: 'from-sunset-400 to-coral-500',
    title: '그룹 미팅에서 만난 인연', days: 97,
    body: '4:4 브런치 미팅에서 처음 만났어요. 어색할 틈 없이 자연스럽게 친해졌고, 지금은 매주 데이트 중이에요.',
    tags: ['그룹미팅', '브런치', '강남'],
  },
  {
    id: 3, couple: '서연 ♥ 시현', area: '홍대', emoji: '🎨', gradient: 'from-grape-400 to-sunset-400',
    title: '취향이 같으니 편했어요', days: 156,
    body: '둘 다 전시 덕후라 공통 관심사 분석에서 딱 맞았어요. 첫 데이트도 전시회! 대화가 너무 즐거웠습니다.',
    tags: ['공통관심사', '전시', '홍대'],
  },
]

export const STATS = [
  { value: '12.8만+', label: '누적 매칭', emoji: '💘' },
  { value: '94%', label: '재매칭 만족도', emoji: '⭐' },
  { value: '3,200+', label: '성사된 커플', emoji: '💑' },
  { value: '180+', label: '제휴 장소', emoji: '📍' },
]

export const STEPS = [
  { step: '01', title: '프로필 & 성향 등록', desc: 'MBTI, 관심사, 연애 스타일까지. 1분이면 충분해요.', emoji: '✍️' },
  { step: '02', title: 'AI가 성향을 분석', desc: '12만 매칭 데이터로 당신과 잘 맞는 상대를 찾아요.', emoji: '🤖' },
  { step: '03', title: '시간·장소 자동 추천', desc: '점심·퇴근 후, 둘 다 좋아할 카페까지 한 번에.', emoji: '📍' },
  { step: '04', title: '설레는 첫 만남', desc: '부담 없는 한 끼로 시작하는 자연스러운 인연.', emoji: '💕' },
]

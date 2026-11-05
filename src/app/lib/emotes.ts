export interface AnimeEmote {
  code: string
  name: string
  shortName: string
  src: string
  character: string
  anime: string
}

export const ANIME_EMOTES: AnimeEmote[] = [
  { code: ':anya_heh:', name: 'Anya Heh', shortName: 'Anya', src: '/emotes/anya_heh.svg', character: 'Anya Forger', anime: 'Spy x Family' },
  { code: ':anya_shock:', name: 'Anya Shock', shortName: 'Shock', src: '/emotes/anya_shock.svg', character: 'Anya Forger', anime: 'Spy x Family' },
  { code: ':luffy_laugh:', name: 'Luffy Laugh', shortName: 'Luffy', src: '/emotes/luffy_laugh.svg', character: 'Luffy', anime: 'One Piece' },
  { code: ':luffy_meat:', name: 'Luffy Meat', shortName: 'Meat', src: '/emotes/luffy_meat.svg', character: 'Luffy', anime: 'One Piece' },
  { code: ':nezuko_peek:', name: 'Nezuko Peek', shortName: 'Nezuko', src: '/emotes/nezuko_peek.svg', character: 'Nezuko Kamado', anime: 'Demon Slayer' },
  { code: ':gojo_wink:', name: 'Gojo Wink', shortName: 'Gojo', src: '/emotes/gojo_wink.svg', character: 'Satoru Gojo', anime: 'Jujutsu Kaisen' },
  { code: ':sukuna_grin:', name: 'Sukuna Grin', shortName: 'Sukuna', src: '/emotes/sukuna_grin.svg', character: 'Ryomen Sukuna', anime: 'Jujutsu Kaisen' },
  { code: ':chopper_cry:', name: 'Chopper Cry', shortName: 'Chopper', src: '/emotes/chopper_cry.svg', character: 'Tony Tony Chopper', anime: 'One Piece' },
  { code: ':naruto_ramen:', name: 'Naruto Ramen', shortName: 'Naruto', src: '/emotes/naruto_ramen.svg', character: 'Naruto Uzumaki', anime: 'Naruto' },
  { code: ':kakashi_read:', name: 'Kakashi Read', shortName: 'Kakashi', src: '/emotes/kakashi_read.svg', character: 'Kakashi Hatake', anime: 'Naruto' },
  { code: ':zoro_lost:', name: 'Zoro Lost', shortName: 'Zoro', src: '/emotes/zoro_lost.svg', character: 'Roronoa Zoro', anime: 'One Piece' },
  { code: ':rem_smile:', name: 'Rem Smile', shortName: 'Rem', src: '/emotes/rem_smile.svg', character: 'Rem', anime: 'Re:Zero' },
]

export const ANIME_EMOTE_MAP: Record<string, AnimeEmote> = ANIME_EMOTES.reduce((acc, emote) => {
  acc[emote.code] = emote
  return acc
}, {} as Record<string, AnimeEmote>)

export interface KaomojiCategory {
  name: string
  icon: string
  emotes: string[]
}

export const KAOMOJI_CATEGORIES: KaomojiCategory[] = [
  {
    name: 'Joie & Cute',
    icon: '✨',
    emotes: [
      '(≧◡≦)',
      '(◕‿◕✿)',
      '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧',
      '(=^･ω･^=)',
      '(｡♥‿♥｡)',
      '(✿◠‿◠)',
      '(づ｡◕‿‿◕｡)づ',
      '٩(◕‿◕｡)۶',
      '(＾▽＾)',
      '(´｡• ᵕ •｡`)',
      '╰(▔∀▔)╯',
      '(★ω★)',
    ],
  },
  {
    name: 'Timidité & Amour',
    icon: '💖',
    emotes: [
      '(⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)',
      '(っ˘з(˘⌣˘ )',
      '(♡˙︶˙♡)',
      '(つ✧ω✧)つ',
      '(*/ω＼*)',
      '(❤ω❤)',
      '(⁄ ⁄•⁄ω⁄•⁄ ⁄)',
      '(๑•́ ₃ •̀๑)',
      '( ˘⌣˘)♡(˘⌣˘ )',
    ],
  },
  {
    name: 'Combat & Action',
    icon: '⚔️',
    emotes: [
      '(ง •̀_•́)ง',
      '(ง\'̀-\'́)ง',
      '( ｀皿´)｡ﾐ☆',
      '⚔️(•̀ᴗ•́)و',
      '(☞ﾟヮﾟ)☞',
      '( •_•)>⌐■-■',
      '(⌐■_■)',
      '(っಠ‿ಠ)っ',
      'ᕦ(ò_óˇ)ᕤ',
    ],
  },
  {
    name: 'Colère & Flip',
    icon: '💢',
    emotes: [
      '(╯°□°)╯︵ ┻━┻',
      '(ノಠ益ಠ)ノ',
      '(凸ಠ益ಠ)凸',
      '┬─┬ノ( º _ ºノ)',
      '(눈_눈)',
      '(ಠ_ಠ)',
      '(｀Д´)',
      '(╬ Ò﹏Ó)',
    ],
  },
  {
    name: 'Choc & Doute',
    icon: '😱',
    emotes: [
      '(⊙_☉)',
      '(°ロ°) !',
      '(O_O;)',
      '(；¬д¬)',
      '(￣ω￣;)',
      '┐(‘～` )┌',
      '(・_・;)',
      '(⊙_◎)',
    ],
  },
  {
    name: 'Tristesse',
    icon: '💧',
    emotes: [
      '(╥﹏╥)',
      '(ಥ﹏ಥ)',
      '(T_T)',
      '(ノ_・。)',
      '( ᵒ̴̶̷᷄ д ᵒ̴̶̷᷅ )',
      '(｡•́︿•̀｡)',
      '(つω`｡)',
      '(ಥ_ʖಥ)',
    ],
  },
]

export interface EmojiGroup {
  name: string
  icon: string
  emojis: string[]
}

export const EMOJI_GROUPS: EmojiGroup[] = [
  {
    name: 'Manga & Otaku',
    icon: '🍙',
    emojis: [
      '💢', '💥', '💫', '💤', '✨', '⚡', '💨', '💦', '🩸',
      '🍙', '🍥', '🍡', '🍱', '🍜', '🍣', '🍤', '🥟', '🍢', '🍵', '🍶', '🧋', '🥢',
      '🌸', '🌺', '🎋', '🎏', '🎐', '🎑', '⛩️', '🗾', '🗻', '🏮', '🎆', '🎇',
      '👺', '👹', '🦊', '🐉', '🐱', '🗡️', '⚔️', '🏹', '🪄', '📜', '👑',
    ],
  },
  {
    name: 'Populaire & Chat',
    icon: '🔥',
    emojis: [
      '😂', '🤣', '😭', '🥺', '💀', '🔥', '🗿', '🤡', '💖', '💔', '🖤', '👀',
      '🫡', '🤝', '👍', '👎', '💯', '🚀', '✨', '🤯', '🥳', '😈', '🤖', '👻',
      '😍', '🥰', '😎', '🤔', '😏', '🤤', '😤', '😡', '🤬', '🤮', '😴', '🙈',
    ],
  },
]


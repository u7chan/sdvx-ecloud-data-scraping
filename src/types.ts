export type MusicDetail = {
  level: number
  difficulty: 'NOV' | 'ADV' | 'EXH' | 'MXM' | 'INF' | 'GRV' | 'HVN' | 'VVD' | 'XCD'
  jacket: string
}

export type Music = {
  title: string
  artist: string
  details: MusicDetail[]
  tags: string[]
  pack: string
}

export type MusicInitial = Omit<Music, 'details'> & {
  detailUrl: string
}

export type SdvxType = 'arcade' | 'eacloud'

export type SdvxData = {
  baseUrl: string
  lastUpdated: string
  type: SdvxType
  data: Music[]
}

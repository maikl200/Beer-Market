interface volumeType {
  unit: string
  value: number
}

export interface beersType {
  id: number
  name: string
  description: string
  image_url: string
  volume: volumeType
}
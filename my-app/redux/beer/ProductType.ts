interface volumeType {
  unit: string
  value: number
}

export interface ProductType {
  id: number
  title: string
  category: string
  price: string
  image: string
  volume: volumeType
}
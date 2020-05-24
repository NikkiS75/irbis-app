
// Autorization
export interface User {
  email: string
  password: string
  returnSecureToken?: boolean
}
export interface FbAuthResponse {
  idToken: string
  expiresIn: string
}

//Data
export interface Client {
  id?: string
  surname: string
  name: string
  phone: string
  address: string
}

export interface Pet {
  id?: string
  type: string
  gender: string
  name: string
  age: string
  weight: string
  idClient:string
}

export interface Reception {
  id?: string
  date: Date
  clientSurname: string
  petID: string
  petName: string
  symptoms:string
  diagnosis: Diagnosis[]
  services: Services[]
  materials: Materials[]
  appointment: string
}

export interface Diagnosis{
  id?: string
  title: string
}
export interface Services {
  id?: string
  title: string
}
export interface Materials{
  id?: string
  title: string
}

export interface fbCreateResponse{
  name: string
}

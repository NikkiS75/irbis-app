
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
  surname: string
  name: string
  phone: string
  address: string
}

export interface Pet {
  type: string
  gender: string
  name: string
  age: string
  weight: string
}

export interface Reception {
  date: Date
  repeat: boolean
  clientSurname: string
  petName: string
  diagnosis: Diagnosis[]
  services: Services[]
  Materials: Materials[]
  appointment: string
}

export interface Diagnosis{
  title: string
}
export interface Services {
  title: string
}
export interface Materials{
  title: string
}


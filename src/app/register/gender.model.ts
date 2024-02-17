
export enum Gender {
  MALE = 'MALE',
  FEMALE = "FEMALE"
}

export const Gender2LabelMapping = {
  [Gender.MALE]: "GENERAL.GENDER." + Gender.MALE,
  [Gender.FEMALE]: "GENERAL.GENDER." + Gender.FEMALE,
}

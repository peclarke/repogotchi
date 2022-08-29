export type RepogotchiType = {
    GithubName: string;
    PersonalName: string;
    Age: number;
    Languages: string[];
    MaxHealth: number;
    CurrentHealth: number;
    CommitProgress: number;
    LastCommit: string;
    // New Fields
    Level: number;
    Birthdate: string;
    LevelProgress: number;
    LevelReq: number;
    LastVisit: Object;
    Affection: number;
    MaxAffection: number;
    // Fields for sprite generation
    Body: number;
    Eyes: number;
    Mouth: number;
    Accessory: number;
    Ears: number;
    Colour: string;
}
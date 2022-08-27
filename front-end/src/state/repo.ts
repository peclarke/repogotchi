export type RepogotchiType = {
    GithubName: string;
    PersonalName: string;
    Age: string;
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
    LastVisit: string;
    Affection: number;
    MaxAffection: number;
    // Fields for sprite generation
    Body: number;
    Eyes: number;
    Mouth: number;
    Accessory: number;
    Ears: number;
}
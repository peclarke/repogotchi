import { RepogotchiType } from "../state/repo";

export type SpriteGeneration = {
    colour: string,
    body: number,
    ears: number,
    eyes: number,
    mouth: number,
    accessory: number
}

export default function generate() {
    const getRandomSelection = (numOptions: number) => {
        var r = Math.random() * numOptions;
        var selection = Math.floor(r);
        return selection;
    };

    const colours = ["#FFB3B3", "#FFDBA4", "#C1FFFF", "#C9BBCF", "#F9CEEE", "#B4CFB0"];

    const colourChoice: number = getRandomSelection(6);
    const bodyChoice: number = getRandomSelection(4);
    const earChoice: number = getRandomSelection(5);
    const eyeChoice: number = getRandomSelection(4);
    const mouthChoice: number = getRandomSelection(5);
    const accessoryChoice: number = getRandomSelection(7);

    return {
        colour: colours[colourChoice],
        body: bodyChoice,
        ears: earChoice,
        eyes: eyeChoice,
        mouth: mouthChoice,
        accessory: accessoryChoice
    };
}
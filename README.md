# Repogotchi / TamaGit
#### Winner of Best Overall Project at the 2022 UQCS Hackathon. 

Combining Tamagotchis and GitHub to gamify your commits to your repository. 
A project by Paul Clarke and Miriam Elliott Haynes.

## Landing Page
First, you'll need to supply your GitHub Username so we know who you are. Then, get started

<img width="800" alt="Screen Shot 2022-08-29 at 11 12 41 am" src="https://user-images.githubusercontent.com/30831649/187104158-ca7e59d0-3351-4311-bb5a-030be30c498f.png">

## Dashboard
The Dashboard is where you see all your Repogotchis. You can view their health, affection, names, and avatars. You can also add and remove Repogotchis from the action bar on the right.
<img width="800" alt="Screen Shot 2022-08-29 at 11 13 46 am" src="https://user-images.githubusercontent.com/30831649/187104227-e73a1e93-9cc1-4455-85c7-dcdb2592b1b0.png">

## Repogotchis
This is your Repogotchi, your new best friend! He's going to help you stay motivated and keep committing to your repository. 
- Each time you commit, your health Repogotchi's health will increase. If health already full, your commits will increase your level experience
- Come visit yor Repogotchi on our site to increase it's affection. He's your best friend after all, come say hello!
- At different levels, you can get different accessories. (Such as the crown at level 3!)
- If your Repogotchi's health or affection starts to drop or reaches 0, his expression will change from a happy face, to a sad face, and eventually a dead one. None-the-less, you can still make a commit and revive your Repogotchi!
- All Repogotchi avatars are procedurally generated using hand-drawn custom assets.
<img width="800" alt="generic 1" src="https://user-images.githubusercontent.com/30831649/187104303-e489b1d1-5537-4d80-97e2-5ea6163349c8.png">
<img width="800" alt="crown accessory" src="https://user-images.githubusercontent.com/30831649/187104417-f0ac54cc-ad21-45cf-9f22-0e9b3d01b16c.png">
<img width="800" alt="dead repo" src="https://user-images.githubusercontent.com/30831649/187104673-f46c2363-7ecd-4b03-b82e-0806d246afb4.png">

## Limitations
- Currently only public GitHub repositories are supported - we would like to change this in future by working with GitHub OAuth
- Repogotchi level-up accessories are currently limited to just the crown

## Known issues
- When adding a repository thats under a different user/organisation's name, the system is unable to query GitHub for its commits and languages
- Commits need to be cached. Github rate limits the requests.

## Future Plans
- Redesign of individual Repogotchi page
- Redesigning the colour scheme

## Possible future plans
- Adding GitHub OAuth integration to allow easier adding of repositories, automatic webhook creation, and support for private repos
- Auth the requests going to Github to increase the rate limit on requests.
- Graveyard for dead repogotchis, and a retirement option to pause updates for mature/finished repos
- Notifications to provide feedback when a repogotchi is fed, or remind users to feed them by committing
- Additional level-up cosmetics
- Affection-based cosmetics

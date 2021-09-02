# :zap: Ionic React Planning

* App using Ionic with React to store a list of projects.
* **Note:** to open web links in a new window use: _ctrl+click on link_

![GitHub repo size](https://img.shields.io/github/repo-size/AndrewJBateman/ionic-react-planning?style=plastic)
![GitHub pull requests](https://img.shields.io/github/issues-pr/AndrewJBateman/ionic-react-planning?style=plastic)
![GitHub Repo stars](https://img.shields.io/github/stars/AndrewJBateman/ionic-react-planning?style=plastic)
![GitHub last commit](https://img.shields.io/github/last-commit/AndrewJBateman/ionic-react-planning?style=plastic)

## :page_facing_up: Table of contents

* [:zap: Ionic React Planning](#zap-ionic-react-planning)
  * [:page_facing_up: Table of contents](#page_facing_up-table-of-contents)
  * [:books: General info](#books-general-info)
  * [:camera: Screenshots](#camera-screenshots)
  * [:signal_strength: Technologies](#signal_strength-technologies)
  * [:floppy_disk: Setup * Development](#floppy_disk-setup--development)
  * [:floppy_disk: Setup * Build, Android Studio](#floppy_disk-setup--build-android-studio)
  * [:computer: Code Examples](#computer-code-examples)
  * [:cool: Features](#cool-features)
  * [:clipboard: Status & To Do List](#clipboard-status--to-do-list)
  * [:clap: Inspiration](#clap-inspiration)
  * [:file_folder: License](#file_folder-license)
  * [:envelope: Contact](#envelope-contact)

## :books: General info

* List of projects from dropdown list of javascript frameworks

## :camera: Screenshots

![Example screenshot](./img/pc.png)

## :signal_strength: Technologies

* [Ionic/React v5](https://www.npmjs.com/package/@ionic/react) used to create app
* [React v17](https://reactjs.org/) JavaScript library
* [Capacitor](https://capacitor.ionicframework.com/docs/) cross*platform app run*time
* [React Dev Tools Chrome extension](https://chrome.google.com/webstore/detail/react*developer*tools/fmkadmapgofadopljbjfkapdkoienihi/related) to help with debugging etc.

* [Ionic Grid](https://ionicframework.com/docs/api/grid)
* [Ion Cards](https://ionicframework.com/docs/api/card)
* [Ion Segment](https://ionicframework.com/docs/api/segment)
* [Ion Modal](https://ionicframework.com/docs/api/modal)
* [Ion Icons](https://ionicons.com/)
* [React Context](https://reactjs.org/docs/context.html) to pass data down the component tree
* [React Hook State](https://reactjs.org/docs/hooks-state.html) to use state

## :floppy_disk: Setup * Development

* Install dependencies using `npm i`
* Run `ionic serve` to open the dev server at `http://localhost:8100/`

## :floppy_disk: Setup * Build, Android Studio

* Run `ionic build` to create build files
* If you don't have it already then Install Android Studio (on Windows 10 in my case * see 'Inspiration' for helpful video)
* Connect mobile device to Android Studio via USB. To go into dev mode on Realme 5 Pro mobile phone connected via USB to Android: Go to 'About Phone'/'Version Baseband & Kernal' in phone settings then click 7 times on 'Version' and enter phone access code. Go to Settings/Additional Settings/Developer options and enable 'USB debugging'

## :computer: Code Examples

* `pages/AllProjects.tsx` Ion grid to show list of projects

```tsx
<IonGrid>
 {projectsCtxt.projects.map((project) => (
       <IonRow key={project.id}>
        <IonCol className="ion-text-center">
         <IonCard>
          <img src={project.imageUrl} alt="Project" />
          <IonCardHeader>
           {/* <IonCardTitle>{project.time}</IonCardTitle> */}
           <IonCardTitle>{project.title}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
           <p>{project.description}</p>
           <IonItem lines="none">
            {!project.isFinished ? (
             <IonRow className={classes.CenterElement}>
              <IonButton color="warning">
               <IonIcon icon={pencil} />
              </IonButton>
              <IonButton
               onClick={() => openFinishedModal(project)}
              >
               <IonIcon icon={checkmarkOutline} />
              </IonButton>
             </IonRow>
            ) : (
             <IonIcon
              color="success"
              className={classes.CenterElement}
              icon={checkmarkOutline}
             />
            )}
           </IonItem>
          </IonCardContent>
         </IonCard>
        </IonCol>
       </IonRow>
  ))}
</IonGrid>
```

## :cool: Features

* [Side navigation drawer](https://ionicframework.com/docs/api/menu)

## :clipboard: Status & To Do List

* Status: Working. Do not update dependencies.
* To-Do: Improve side menu - add pages?, change project complete button add more project types, change time to createdAt in footer? Add backend storage.

## :clap: Inspiration

None

## :file_folder: License

* This project is licensed under the terms of the MIT license.

## :envelope: Contact

* Repo created by [ABateman](https://github.com/AndrewJBateman), email: gomezbateman@yahoo.com

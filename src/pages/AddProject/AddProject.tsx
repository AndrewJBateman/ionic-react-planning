import React, { useRef, useContext, useState } from 'react';
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonRow,
	IonGrid,
	IonCol,
	IonButtons,
	IonMenuButton,
	IonSegment,
	IonSegmentButton,
	IonLabel,
	IonInput,
	IonDatetime,
	IonButton,
	IonToast,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import ProjectsContext, { ProjectType } from '../../data/projects-context';

const AddProject: React.FC = () => {
	
	const history = useHistory();
	const projectsCtxt = useContext(ProjectsContext);

	const titleInput = useRef<HTMLIonInputElement>(null);
	const descriptionInput = useRef<HTMLIonInputElement>(null);
	const projectTypeInput = useRef<HTMLIonSegmentElement>(null);
	const timeInput = useRef<HTMLIonDatetimeElement>(null);

	const [toastMsg, setToastMsg] = useState<string>('');

	const addProject = () => {
		const title = titleInput.current?.value as string;
		const description = descriptionInput.current?.value as string;
		const projectType = projectTypeInput.current?.value as ProjectType;
		const startDate = new Date(timeInput.current?.value as string);
		const startTime = startDate.getHours() + ':' + startDate.getMinutes();

		if (title && description && projectType && startTime) {
			projectsCtxt.addProject(title, description, startTime, projectType);
			setToastMsg('The project was saved');
			history.replace('/all-projects');
		}
	};

	return (
		<React.Fragment>
			<IonToast
				isOpen={!!toastMsg}
				message={toastMsg}
				duration={4000}
				color="medium"
				onDidDismiss={() => setToastMsg('')}
			/>

			<IonPage>
				<IonHeader>
					<IonToolbar>
						<IonButtons slot="start">
							<IonMenuButton />
						</IonButtons>
						<IonTitle>Add Project</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<IonGrid>
						<IonRow>
							<IonCol className="ion-text-center">
								<IonSegment ref={projectTypeInput}>
									<IonSegmentButton value="angular">
										<IonLabel>Angular</IonLabel>
									</IonSegmentButton>
									<IonSegmentButton value="mern">
										<IonLabel>Mern</IonLabel>
									</IonSegmentButton>
									<IonSegmentButton value="vue">
										<IonLabel>Vue</IonLabel>
									</IonSegmentButton>
								</IonSegment>
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol>
								<IonLabel position="floating">Project Title</IonLabel>
								<IonInput ref={titleInput} type="text"></IonInput>
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol>
								<IonLabel position="floating">Project Description</IonLabel>
								<IonInput ref={descriptionInput} type="text"></IonInput>
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol>
								<IonLabel position="floating">Start Time</IonLabel>
								<IonDatetime
									ref={timeInput}
									display-format="h:mm A"
									picker-format="h:mm A"
									value={new Date().toISOString()}
								/>
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol className="ion-text-center ion-margin-top">
								<IonButton onClick={addProject} expand="block" fill="outline">
									Add Project
								</IonButton>
							</IonCol>
						</IonRow>
					</IonGrid>
				</IonContent>
			</IonPage>
		</React.Fragment>
	);
};

export default AddProject;

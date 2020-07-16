import React, { useContext, useState } from 'react';
import classes from './AllProjects.module.css';
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonContent,
	IonRow,
	IonGrid,
	IonCol,
	IonButtons,
	IonMenuButton,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardSubtitle,
	IonCardContent,
	IonItem,
	IonButton,
	IonTitle,
	IonModal,
	IonIcon,
} from '@ionic/react';
import ProjectsContext, { Project } from '../../data/projects-context';
import FinishedModal from '../../components/finishedModal';
import { checkmarkOutline } from 'ionicons/icons';

const AllProjects: React.FC = () => {
	
	const [projectToFinished, setProjectToFinished] = useState<Project>();

	const projectsCtxt = useContext(ProjectsContext);

	const openFinishedModal = (project: Project) => {
		setProjectToFinished(project);
	};

	const closeModal = () => {
		setProjectToFinished(undefined);
	};

	return (
		<React.Fragment>
			<IonModal isOpen={!!projectToFinished} swipeToClose={true}>
				<FinishedModal
					project={projectToFinished as Project}
					dismissModal={closeModal}
				/>
			</IonModal>

			<IonPage>
				<IonHeader>
					<IonToolbar>
						<IonButtons slot="start">
							<IonMenuButton />
						</IonButtons>
						<IonTitle>All Projects</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<IonGrid>
						{projectsCtxt.projects.map((project) => (
							<IonRow key={project.id}>
								<IonCol className="ion-text-center">
									<IonCard>
										<img src={project.imageUrl} alt="Project" />
										<IonCardHeader>
											<IonCardTitle>{project.time}</IonCardTitle>
											<IonCardSubtitle>{project.title}</IonCardSubtitle>
										</IonCardHeader>
										<IonCardContent>
											<p>{project.description}</p>
											<IonItem lines="none">
												{	!project.isFinished ?
													<IonButton
														className={classes.CenterElement}
														fill="clear"
														onClick={() => openFinishedModal(project)}
													>
														Project Finished
													</IonButton>
													:
													<IonIcon color="success" className={classes.CenterElement} icon={checkmarkOutline}/>
												}
											</IonItem>
										</IonCardContent>
									</IonCard>
								</IonCol>
							</IonRow>
						))}
					</IonGrid>
				</IonContent>
			</IonPage>
		</React.Fragment>
	);
};

export default AllProjects;

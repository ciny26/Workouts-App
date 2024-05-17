import Workouts from "../components/Workouts/Workouts";
import AddWorkout from "../components/Froms/AddWorkout";

const Home = () => {
    return ( 
        <div className="home">
            <Workouts/>
            <AddWorkout />
        </div>
    );
}
 
export default Home;

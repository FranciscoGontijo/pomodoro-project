import "./stats.css";

const Stats = () => {
    return (
        <div>
            <h1>Stats!</h1>
        </div>
    )
};

//Stats is and requested page that appears if the user is logged in. 
//Basicly every data/ information that we will use in this page is requested to a server and will only be answered if the user is logged in
//Will request unique information for each User
//To do that we need a server / database
//Each time that one stats is changed it need to send a POST request to the server updating the stats
//And one GET request to the server to update the page

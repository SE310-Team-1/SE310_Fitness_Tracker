const TempWorkoutDisplay = ({ data }) => {
    return (
      <div>
        <h1>Below is TempWorkoutDisplay.jxs</h1>
        {data.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>Weight: {item.weight}</p>
            <p>Set: {item.set}</p>
            <p>Reps: {item.rep}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default TempWorkoutDisplay;
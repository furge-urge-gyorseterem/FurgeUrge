const Dashboard = (props) => {
	return (
		<div>
			<h1>Role Selector</h1>
			<button onClick={() => props.set(1)}>Admin</button>
			<button onClick={() => props.set(2)}>Dolgozó</button>
			<button onClick={() => props.set(3)}>Futár</button>
		</div>
	);
};

export default Dashboard;

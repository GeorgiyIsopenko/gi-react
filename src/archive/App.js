// import React, { Component } from "react";

// import NavBar from "./navBar_counters";
// import Counters from "./counters";
// import NavBarHeader from "./components/common/navBarHeader";

// class App extends Component {
//   state = {
//     counters: [
//       { id: 0, value: 0 },
//       { id: 1, value: 3 },
//       { id: 2, value: 6 },
//       { id: 3, value: 8 }
//     ]
//   };
//   constructor() {
//     super();
//     console.log("App - Constructor");
//   }

//   handleDelete = id => {
//     const counters = this.state.counters.filter(c => c.id !== id);
//     this.setState({ counters });
//   };

//   handleIncrement = counter => {
//     const counters = [...this.state.counters];
//     const index = counters.indexOf(counter);
//     counters[index].value++;
//     this.setState({ counters });
//   };

//   handleDecrement = counter => {
//     const counters = [...this.state.counters];
//     const index = counters.indexOf(counter);
//     if (counters[index].value > 0) {
//       counters[index].value--;
//       this.setState({ counters });
//     }
//   };

//   handleReset = () => {
//     const counters = this.state.counters.map(c => {
//       c.value = 0;
//       return c;
//     });
//     this.setState({ counters });
//   };

//   render() {
//     return (
//       <React.Fragment>
//         <NavBarHeader
//           totalCounters={this.state.counters.filter(c => c.value > 0).length}
//         />
//         <main className="container">
//           <Counters
//             counters={this.state.counters}
//             onDelete={this.handleDelete}
//             onIncrement={this.handleIncrement}
//             onDecrement={this.handleDecrement}
//             onReset={this.handleReset}
//           />
//         </main>
//       </React.Fragment>
//     );
//   }
// }

// export default App;

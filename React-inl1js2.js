let inp = document.getElementById('input');
let printDiv = document.getElementById('print');

/////////////////////////// PART 1 /////////////////////////////////

class Print extends React.Component {
    render() {
        return ( <p>{inp.value}</p> );
    }
}

inp.addEventListener('keyup', x => {
    ReactDOM.render(<Print />, printDiv);       
})       


/////////////////////////// PART 2 /////////////////////////////////

class Part2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num1: '',
            num2: '',
			sort: '+'
        };
        this.inputNo1 = this.inputNo1.bind(this);
        this.inputNo2 = this.inputNo2.bind(this);
		this.changeSort = this.changeSort.bind(this);
    }
    inputNo1(event) {
        console.log(event.target.value);
        this.setState({
                num1: event.target.value
            });
    }
    inputNo2(event) {
        console.log(event.target.value);
        this.setState({
                num2: event.target.value
            });
    }
	changeSort(ev){
		this.setState({
			sort: ev.target.value
		})
	}
    render() {
        return (<div>
            
            <Form 
                num1KeyUp={this.inputNo1}
                num2KeyUp={this.inputNo2}
				selectChange={this.changeSort}/>
            <PrintSum item={ {num1: this.state.num1, num2: this.state.num2, sort: this.state.sort} }/>
        </div>)
    }
} 


// FORM
            
class Form extends React.Component {
    render() {
        return (
        <div>
            <input type="text" placeholder="Tal 1"
                onKeyUp={this.props.num1KeyUp}></input>
            <input type="text" placeholder="Tal 2"
                onKeyUp={this.props.num2KeyUp}></input>
				<select onChange={this.props.selectChange}>
					<option value="+">+</option>
					<option value="-">-</option>
				</select>
        </div>
                )
    }
}


// PRINT SUM PART

class PrintSum extends React.Component {
    render() {
        //console.log(this.props.item);
        let i = this.props.item;
		let sum = null;
		if (i.sort === '+'){
			sum = Number(i.num1) + Number(i.num2);
		}
		else if(i.sort === '-'){
			sum = Number(i.num1) - Number(i.num2);
		}
        	if (sum > 0){
				return (
            		<div className="printSum">{sum}</div>
        		)
			}
			else {
				return (
					<div></div>
				)
			}
    }
}

ReactDOM.render(
    <Part2 />, document.getElementById('part2')
);



/////////////////////////// PART 3 /////////////////////////////////

class Part3 extends React.Component {
	constructor(props) {
		super(props);
		console.log('state');
		this.state = {
			msg: '',
			highest: 0,
			btns: [
			{
				id: 'btn1',
				class: 'inactive',
				pressCount: 0,
				highClass: ''
			},
			{
				id: 'btn2',
				class: 'inactive',
				pressCount: 0,
				highClass: ''
			},
			{
				id: 'btn3',
				class: 'inactive',
				pressCount: 0,
				highClass: ''
			},
			{
				id: 'btn4',
				class: 'inactive',
				pressCount: 0,
				highClass: ''
			}]
		}
		this.btnPress = this.btnPress.bind(this);
	}
	btnPress(ev){
		console.log(this.state.highest);
		let highest = this.state.highest;
		
		let id = ev.target.id;
		//let count = 
		
		
		this.state.btns.forEach(el => {
			el.class = '';
			console.log(el.class);
			if (el.id === id){
				
				el.pressCount++;
				el.class = 'active';
				//console.log(el.pressCount);
				this.setState({
					msg: ev.target.innerText + ' has been clicked ' + el.pressCount + ' times'
				});
				if (el.pressCount > highest) {
					highest = el.pressCount;
					console.log('ÄÄÄÄ' + highest);
					this.setState({
						highest: highest
					});
					
				}
			}
			else {
				el.class = 'inactive';
			}
			
			console.log(el.class);
			//console.log(el.class);
		})
		this.state.btns.forEach(el => {
			console.log('pC '+el.pressCount);
			console.log('high ' + highest);
			if (el.pressCount >= highest) {
				highest = el.pressCount;
				console.log('if');
				this.setState({
					highest: highest
				});
				console.log(this.state.highest);
				el.class += ' highest';
			}
		})
		
	}
	
    render() {
        return (
            <div>
				<button className={this.state.btns[0].class} id="btn1" onClick={this.btnPress}>Btn 1</button>
				<button className={this.state.btns[1].class} id="btn2" onClick={this.btnPress}>Btn 2</button>
				<button className={this.state.btns[2].class} id="btn3" onClick={this.btnPress}>Btn 3</button>
				<button className={this.state.btns[3].class} id="btn4" onClick={this.btnPress}>Btn 4</button><br/>
				<span>{this.state.msg}</span>
			</div>
        )
    }
}

ReactDOM.render(
	<Part3 />,
	document.getElementById('part3')
);
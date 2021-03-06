let defaultList = [
	{
		song: 'No Reason',
		artist: 'Bonobo',
		key: 1
	},
	{
		song: 'Star Rowing',
		artist: 'Slowdive',
		key: 2
	},
	{
		song: 'Please',
		artist: 'Blanck Mass',
		key: 3
	},
	{
		song: 'Hot Thoughts',
		artist: 'Spoon',
		key: 4
	},
	{
		song: 'Goose Snow Cone',
		artist: 'Aimee Mann',
		key: 5
	}
]



////////////////////// APP //////////////////////////


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			song: '',
			artist: '',
			tracklist: defaultList,
			listID: 5,
			trackVal: '',
			artistVal: '',
			btnTitle: 'Lägg till låt',
			edit: false,
			editObj: null,
			clickedID: 0
		}
		this.addObj = this.addObj.bind(this);
		this.updateObj = this.updateObj.bind(this);
		this.listRow = this.listRow.bind(this);
		this.editRow = this.editRow.bind(this);
		this.deleteRow = this.deleteRow.bind(this);
	}
	
	
	updateObj(ev){
		if (ev.target.placeholder === 'Låt'){
			this.setState({
				song: ev.target.value,
				trackVal: ev.target.value
			});
		}
		else if(ev.target.placeholder === 'Artist'){
			this.setState({
				artist: ev.target.value,
				artistVal: ev.target.value
			});
		}
	}
	
	addObj(ev){
		let list = this.state.tracklist;
		let edit = this.state.edit;
		
		if(edit){
			let newList = [];
			let key = this.state.editObj.key;
			list.forEach(x => {
				if (x.key === key){
					let obj = {
						song: this.state.song,
						artist: this.state.artist,
						key: key
					}
					newList.push(obj);
				} else {
					newList.push(x);
				}
			})
			this.setState({
				tracklist: newList,
				btnTitle: 'Lägg till låt',
				edit: false,
				clickedID: 0
			});
			
			
		} 
		else {
		let id = this.state.listID + 1;
			list.push({
				song: this.state.song,
				artist: this.state.artist,
				key: id
			});
			this.setState({
				listID: id,
				tracklist: list
				});
		}
	}
	
	
	// Creates object when user clicks a specific row
	listRow(ev){
		let id = Number(ev.target.parentElement.id);
		let list = this.state.tracklist;
		let clickedObj = null;
		list.forEach(x => {
			if (x.key === id){
				clickedObj = x;
			}
		})
		this.setState({
			song: clickedObj.song,
			artist: clickedObj.artist,
			trackVal: clickedObj.song,
			artistVal: clickedObj.artist,
			clickedID: clickedObj.key
		})
	}
	
	editRow(ev){
		let id = Number(ev.target.parentElement.parentElement.id);
		let list = this.state.tracklist;
		let clickedObj = null;
		list.forEach(x => {
			if (x.key === id){
				clickedObj = x;
			}
		})
		this.setState({
			btnTitle: 'Ändra låt',
			edit: true,
			editObj: clickedObj,
			trackVal: clickedObj.song,
			artistVal: clickedObj.artist,
			song: clickedObj.song,
			artist: clickedObj.artist
		});
		
	}
	
	deleteRow(ev){
		let id = Number(ev.target.parentElement.parentElement.id);
		let list = this.state.tracklist;
		let newList = list.filter(x => {
			return x.key !== id;
		});
		this.setState({
			tracklist: newList
		});
	}
	
	render() {
		return <div>
			<AddForm 
				update={this.updateObj}
				addTrack={this.addObj}
				trackInpVal={this.state.trackVal}
				artistInpVal={this.state.artistVal}
				btnTitle={this.state.btnTitle}/>
			<MyList list={this.state.tracklist}
				showRow={this.listRow}
				editRow={this.editRow}
				deleteRow={this.deleteRow}
				clickID={this.state.clickedID}/>
		</div>
	}
}


/////////////////// ADD FORM ///////////////////////////

class AddForm extends React.Component {
	render() {
		//let artist = this.state.artistVal ? this.state.artistVal : //this.props.artistVal;
		return <div className="formDiv">
			<input type="text" placeholder="Låt" onChange={this.props.update} value={this.props.trackInpVal} />
			<input type="text" placeholder="Artist" onChange={this.props.update} value={this.props.artistInpVal} />
			<button onClick={this.props.addTrack}>{this.props.btnTitle}</button>
		</div>
	}
}



//////////////////// MYLIST //////////////////////////

class MyList extends React.Component {
	render() {
		let list = this.props.list;
		let clickID = this.props.clickID;
		let elementList = list.map(x => {
			if (x.key === clickID){
				return <tr key={x.key} id={x.key}><td onClick={this.props.showRow}>{x.song}</td><td onClick={this.props.showRow}>{x.artist}</td>
					<td><img src="edit.png" onClick={this.props.editRow}></img></td>
					<td><img src="delete.png" onClick={this.props.deleteRow}></img></td></tr>
			} else {
				return <tr key={x.key} id={x.key}><td onClick={this.props.showRow}>{x.song}</td><td onClick={this.props.showRow}>{x.artist}</td></tr>
			}
			
			});
			return <div className="tableDiv"><table>
				<thead><tr><td>Låt</td><td>Artist</td></tr></thead>
				<tbody>{elementList}</tbody>
			</table>
		 </div>
		
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('App')
);




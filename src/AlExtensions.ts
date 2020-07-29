import * as vscode from 'vscode';
import AlExtension = require("./AlExtension");
class AlExtensions{
	private list:Promise<AlExtension[]>;
	constructor(){
		//this.list = [];
		//var files = await vscode.workspace.findFiles('**/app.json');
		//files.then((uris: vscode.Uri[] ) => {
		//	uris.forEach((uri: vscode.Uri) => {
		//		this.list.push(new AlExtension(uri));
		//	});
		//});
		this.list = this.createExtensionList();
		Promise.all;
	}
	private async createExtensionList():Promise<AlExtension[]>{
		let list:AlExtension[]=[];
		var uris = await vscode.workspace.findFiles('**/app.json');
			uris.forEach((uri: vscode.Uri) => {
				list.push(new AlExtension(uri));
			});
		Promise.all;
		return list;
	}
	public writeAllDescriptionFile():void{
		Promise.all;
		this.list.then((list:AlExtension[])=>{
			list.forEach((o:AlExtension)=>{
				o.writeDescriptionFile();
			});
			
		});
	}
}
export = AlExtensions;
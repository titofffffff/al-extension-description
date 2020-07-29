import * as vscode from 'vscode';
import AlObject = require("./AlObject");
import * as fs from 'fs';
class AlExtension{
	private jsonFilePath:vscode.Uri;
	private description:JSON;
	private basePath:string;
	private _objectList: Promise<AlObject[]>;
	public get objectList(): Promise<AlObject[]> {
		return this._objectList;
	}
	public set objectList(value: Promise<AlObject[]>) {
		this._objectList = value;
	}
	constructor(uri:vscode.Uri){
		this.jsonFilePath = uri;
		let fileContent = fs.readFileSync(uri.path,'utf8');
		this.description = JSON.parse(fileContent);
		this.basePath = uri.path.substr(0,uri.path.length-'/app.json'.length);
		
		let searchPattern = '**/*.al';
		this._objectList= this.createObjectList(searchPattern,this.basePath);
		Promise.all;
	}
	private async createObjectList(searchPattern:string,searchPath:string):Promise<AlObject[]>{
		let list:AlObject[]=[];
		var uris = await vscode.workspace.findFiles(searchPattern);
			uris.forEach((uri: vscode.Uri) => {
				if (uri.path.startsWith(searchPath,0)) {
				list.push(new AlObject(uri.path));
				}
			});
		Promise.all;
		return list;
	}
	

	public writeDescriptionFile():void{
		var tab = '|Type|ID|Name|\n|-|-|-|\n';
		this._objectList.then((list:AlObject[])=>{
			list.forEach((o:AlObject)=>{
				tab += o.getMdDescriptionTab();
			});
			fs.writeFileSync(this.basePath+'/description.md',tab);
		});
		
	}
}
export = AlExtension;

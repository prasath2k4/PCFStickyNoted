import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as $ from 'jquery';

export class PCFStickyNotes implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _input: HTMLInputElement;
	private _breakElement1: HTMLElement;
	private _breakElement2: HTMLElement;
	private _submitButton: HTMLElement;
	private _wrapperDiv : HTMLDivElement;
	private _submitClicked: EventListenerOrEventListenerObject;

	private _context: ComponentFramework.Context<IInputs>;
    private _notifyOutputChanged: () => void;
    private _container: HTMLDivElement;

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code
		this._context = context;
        this._notifyOutputChanged = notifyOutputChanged;
		this._container = container;
		
		this._submitClicked = this.submitClick.bind(this);

		this._input = document.createElement("input");
		this._input.className = "input";
        this._input.setAttribute("type", "text");
        this._input.setAttribute("id", "notes"); 
		this._input.setAttribute("autocomplete", "off");
		
		this._breakElement1 = document.createElement("br");
		this._breakElement2 = document.createElement("br");

		// submit button 
		this._submitButton = document.createElement("input");
		this._submitButton.setAttribute("type", "button");
		this._submitButton.setAttribute("style", "background-color: orangered;border: none;color: white;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;height:35px;");
        this._submitButton.setAttribute("value", "Add Notes");
		this._submitButton.addEventListener("click", this._submitClicked);

		//div

		this._wrapperDiv = document.createElement("div");
		this._wrapperDiv.className = "wrapper clearfix";
		
		this._container.appendChild(this._input);
		this._container.appendChild(this._breakElement1);    
		this._container.appendChild(this._breakElement2);
		this._container.appendChild(this._submitButton);
		this._container.appendChild(this._wrapperDiv);
	}

	public submitClick(evt: Event): void {
		$('.wrapper').append("<aside class="+"note-wrap note-yellow"+"><p>"+$("#notes").val()+"</p></aside>");
		$("#notes").val("");
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}

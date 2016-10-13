import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
const searchIcon = require("!raw!./img/search.svg");
const fileIcon = require("!raw!./img/pages.svg");
import { Scrollbars } from "react-custom-scrollbars";

export default class FilePicker extends Component {

    constructor() {
        super();
        this.state = {
            showFilePicker: false,
            searchFileText: ""
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener("click", this.handleClick, false);
        this._isMounted = true;
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick, false);
        this._isMounted = false;
    }

    handleClick(e) {
        if (!this._isMounted) { return; }
        const node = ReactDOM.findDOMNode(this);
        if (node && node.contains(e.target)) {
            return;
        }
        this.hide();
    }

    hide() {
        this.setState({ showFilePicker: false, searchFileText: "" });
    }

    onFileNameClick(file) {
        this.hide();
        this.props.onFileClick(file);
    }

    onChangeSearchFileText(e) {
        const searchFileText = e.target.value;
        this.setState({ searchFileText });
    }

    onFilesClick() {
        const {showFilePicker} = this.state;
        if (!showFilePicker) {
            if (!this.props.files) {
                this.props.getFiles();
            }
        }
        this.setState({ showFilePicker: !showFilePicker });
    }

    isMatchSearch(fileName) {
        if (!this.state.searchFileText) {
            return true;
        }
        return fileName.indexOf(this.state.searchFileText) !== -1;
    }

    getFiles() {
        if (!this.props.files) {
            return false;
        }

        const files = this.props.files.map((child) => {
            /* eslint-disable react/no-danger */
            const isMatchSearch = this.isMatchSearch(child.data.value);
            return <li>
                {isMatchSearch && <div className="icon" dangerouslySetInnerHTML={{ __html: fileIcon }} onClick={this.onFileNameClick.bind(this, child) }/>}
                {isMatchSearch && <div className="item-name" onClick={this.onFileNameClick.bind(this, child) }>{child.data.value}</div>}
            </li>;
        });
        return <ul>{files}</ul>;
    }

    render() {
        /* eslint-disable react/no-danger */
        const selectedFileText = this.props.selectedFile ? this.props.selectedFile.value : "<Not Specified>";

        const files = this.getFiles();

        return <div className="drop-down">
            <div className="selected-item" onClick={this.onFilesClick.bind(this) }>
                {selectedFileText}
            </div>
            <div className={"item-picker-container" + (this.state.showFilePicker ? " show" : "") } >
                <div className="inner-box">
                    <div className="search">
                        <input type="text" value={this.state.searchFileText} onChange={this.onChangeSearchFileText.bind(this) } placeholder="Search Files..." />
                        <div className="search-icon" dangerouslySetInnerHTML={{ __html: searchIcon }} />
                    </div>
                    <div className="items">
                        <Scrollbars className="scrollArea content-vertical"
                            autoHeight
                            autoHeightMin={0}
                            autoHeightMax={200}>
                            <div className="item-picker">
                                {files}
                            </div>
                        </Scrollbars>
                    </div>
                </div>
            </div>
        </div>;
    }
}

FilePicker.propTypes = {
    files: PropTypes.object.isRequired,
    onFileClick: PropTypes.func.isRequired,
    selectedFile: PropTypes.object.isRequired,
    getFiles: PropTypes.func.isRequired
};
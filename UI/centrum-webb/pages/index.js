import React, {Component} from "react";
import {Circle, CircleOutlined} from "@mui/icons-material"
import {Tab, Tabs, ThemeProvider, CssBaseline, Button} from "@mui/material"
import theme from "../material-ui-themes/theme"

class Index extends Component{
    constructor(){
        super();
        this.state={
            currentTab: 1,
        };
    }
    componentDidMount = async () =>{
        
    }

    handleChange = async () =>{

    }
    render(){
    return(
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Button variant="contained">Hej</Button> 
                <Tabs value={this.state.currentTab} onChange={this.handleChange}>
                    <Tab icon={this.state.currentTab == "1" ? <Circle /> : <CircleOutlined/>} value="1" />
                    <Tab icon={this.state.currentTab == "2" ? <Circle/> : <CircleOutlined/>} value="2" />
                    <Tab icon={this.state.currentTab == "3" ? <Circle/> : <CircleOutlined/>} value="3" />
                </Tabs>
            </ThemeProvider>
        </div>    
    )}
}

export default Index;
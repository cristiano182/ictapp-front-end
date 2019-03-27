import styled from "styled-components";

export const Container = styled.div.attrs({
  className: "container row bg-dark",
  style: {
    height: "100%",
    marginTop: "5px",
    marginLeft: "0px",
    borderRadius: "5px"
  }
})``;

export const Card = styled.div.attrs({
  className: "card text-white bg-dark",
  style: { marginTop: "5px", minWidth: "100px", width: "100%" }
})``;


export const CardHeader = styled.div.attrs({
  className: "card-header",
  style: { paddingTop: "1px", paddingBottom: "2px", color: "#dddd" }
})``;

export const CardBody = styled.div.attrs({
  className: "card-body",
  style: { textAlign: "left", paddingTop: "1px" }
})``;

export const Button = styled.div.attrs({
  style: {
  border: "0px",
  background: "transparent",
  color: "#ddd",
  cursor: "pointer",
  textlign: "left",
  marginTop: "5px"
  
}
})``;


export const Card2= styled.div.attrs({
  className: "card text-white bg-dark",
  style: {  width: "21.85rem", height: "100%", margin: "5px" }
})``;

export const CardHeader2 = styled.div.attrs({
  className: "card-header",
  style: { paddingTop: "1px", paddingBottom: "2px", color: "#dddd" }
})``;


export const CardBody2 = styled.div.attrs({
className: "card-body",
style: { textAlign: "left", paddingTop: "1px" }
})``;



//style={{ marginTop: "5px", minWidth: "100px", width: "100%" }}

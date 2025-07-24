import {describe,it,expect} from 'vitest'
import {render,screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "./App";


describe('App component', () =>{
   it("render magnificent monkeys", () => {
       const {container} = render(<App/>)
       expect(container).toMatchSnapshot();
   })

   it("renders radical rhinos after button click",async () => {
       const user = userEvent.setup();

       render(<App/>);

       const button = screen.getAllByRole("button",{name: "Click Me"});

       await user.click(button);

       expect(screen.getAllByRole("heading").textContent).match(/radical rhinos/i);
       

   })
})
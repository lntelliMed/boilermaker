// TO-DO:

// REACT TESTS
// Any JavaScript expressions you write in your JSX(using curly braces {}) should get a test case
// Any methods you write in a class component should be tested.
// For event handlers - test the method itself by mock data for the event(or whatever input the method should receive).Test that the method is registered as a listener correctly by using a spy(libraries like sinon can help here).
// These should be separate test cases because attaching the handler to the listener is not contingent upon the handler being written properly.Your click handler could work just fine, but if it's never being attached, that's a problem.Likewise, you could be attaching the right method to the right listener, but perhaps that method doesn't work the way it should. Having two separate test cases allows you to quickly diagnose what kind of problem you have.

// REDUX TESTS
// Your reducer should get at least one test case for each action it consumes
// Each action creator deserves a test case (even though they seem very simple - think of it as a free pass) !
//   For thunk creators and thunks, you should test that they:
// Make the appropriate network request(s)(if they do this)
// Eventually invoke the dispatch method with certain actions(spying on the dispatch method using sinon is recommended here)
// Note the emphasis on actions - you should test that the dispatch method is invoked with certain action objects - NOT that certain action creators were invoked(see below)
// For thunk creators and thunks, you should NOT test:
// The actual result of the network request - this is the job of your server tests!
// That certain(synchronous) action creators are invoked - this is the job of your action creator tests.

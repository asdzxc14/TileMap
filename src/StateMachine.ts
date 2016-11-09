interface State {
    onEnter(_tmain: Main);
    onExit(_tmain: Main);
}

class CharacterState implements State {
    onEnter(_tmain: Main) { };
    onExit(_tmain: Main) { };
}

class StateMachine {
    CurrentState: State;

    setState(e: State, _tmain: Main) {
        if (this.CurrentState != null) {
            this.CurrentState.onExit(_tmain);
        }
        this.CurrentState = e;
        this.CurrentState.onEnter(_tmain);
    }
}


class CharacterIdleState implements CharacterState {
    onEnter(_tmain: Main) {
        _tmain.character.ifIdle=true;
    };

    onExit(_tmain: Main) {
        _tmain.character.ifIdle=false;
    };

}

class CharacterWalkingState implements CharacterState {
    onEnter(_tmain: Main) {
        _tmain.character.ifWalking=true;
    };

    onExit(_tmain: Main) {
        _tmain.character.ifWalking=false;
    };
}

class CharacterGoRightState implements CharacterState {
    onEnter(_tmain: Main) {
        _tmain.character.SetGoRight();
    };

    onExit(_tmain: Main) { };

}

class CharacterGoLeftState implements CharacterState {
    onEnter(_tmain: Main) {
        _tmain.character.SetGoLeft();
    };

    onExit(_tmain: Main) { };
}

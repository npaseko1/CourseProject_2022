import React, {Component} from "react";

class ErrorBoundary extends Component<{}, {hasError: boolean}> {
    constructor(props: any) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error: Error) {
        return {
            hasError: true
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log(error)
        console.log(errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong</h1>
        }
        return this.props.children
    }
}

export default ErrorBoundary
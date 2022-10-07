export enum processState {
    New = 'New',
    Ready = 'Ready',
    ReadySuspended = 'Suspended',
    Run = 'Running',
    WaitSuspended = 'Suspended on I/O',
    Wait = 'I/O',
    Completed = 'Completed',
    Terminate = 'Terminated',
}

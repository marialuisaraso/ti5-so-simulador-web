export enum processState {
    New = 'new',
    Ready = 'ready',
    ReadySuspended = 'suspended',
    Run = 'running',
    WaitSuspended = 'suspended on I/O',
    Wait = 'I/O',
    Completed = 'completed',
    Terminate = 'terminated',
}

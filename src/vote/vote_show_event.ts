export class VoteShowEventRequestDto {
  public blastEnergy: number;
  public userId: string;
  public channelId: string;
  public eventId: string;
 
}

export class CreateVoteShowEventDto {
    public id:string;
    public blast_energy: number;
    public user_id: string;
    public show_id: string;
    public event_id: string;
   
}
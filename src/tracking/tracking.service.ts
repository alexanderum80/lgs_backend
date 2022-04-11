import { Between, getManager, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PlayerStatusView, PlayerStatusCheckView, PlayerTrackingView, FinalPlayerSessions, DropResultsView, MasterTrackingView } from './tracking.entity';

@Injectable()
export class TrackingService {
  // current player status
  async findCurrentPlayersStatus(idPlayer?: number): Promise<PlayerStatusView[]> {
    try {
      return new Promise<PlayerStatusView[]>((resolve, reject) => {
        return new Promise<PlayerStatusView[]>((resolve, reject) => {
          const manager = getManager();

          const _conditions = idPlayer ? { IdPlayer: idPlayer! } : {};

          manager.find(PlayerStatusView, { where: _conditions }).then(result => {
              resolve(result);
          }).catch(err => {
              reject(err.message || err);
          });
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  // current player status check
  async findCurrentPlayersStatusCheck(idPlayer?: number): Promise<PlayerStatusCheckView[]> {
    try {
      return new Promise<PlayerStatusCheckView[]>((resolve, reject) => {
        const manager = getManager();

        const _conditions = idPlayer ? { IdPlayer: idPlayer! } : {};

        manager.find(PlayerStatusCheckView, { where: _conditions }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }
  
  // tracking master
  async findMasterTrackingView(initSession: number, finalSession: number, idPlayer?: number): Promise<MasterTrackingView[]> {
    try {
      return new Promise<MasterTrackingView[]>((resolve, reject) => {
        const manager = getManager();
        const _conditions = { IdSession: Between(initSession, finalSession) };

        if (idPlayer) {
          Object.assign(_conditions, { IdPlayer: idPlayer });
        }

        manager.find(MasterTrackingView, { where: _conditions }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  // current player tracking
  async findCurrentPlayersTracking(idPlayer?: number): Promise<PlayerTrackingView[]> {
    try {
      return new Promise<PlayerTrackingView[]>((resolve, reject) => {
        const manager = getManager();

        const _conditions = idPlayer ? { IdPlayer: idPlayer! } : {};

        manager.find(PlayerTrackingView, { where: _conditions }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }

  // final player session
  async findFinalPlayerSession(initSession: number, finalSession: number, idPlayer?: number): Promise<FinalPlayerSessions[]> {
    try {
      return new Promise<FinalPlayerSessions[]>((resolve, reject) => {
        const manager = getManager();
        const _where = { IdSession: Between(initSession, finalSession) };

        if (idPlayer) {
          Object.assign(_where, { IdPlayer: idPlayer });
        }

        manager.find(FinalPlayerSessions, { where: _where }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }
  
  //drop results
  async findDropResultsView(initSession: number, finalSession: number): Promise<DropResultsView[]> {
    try {
      return new Promise<DropResultsView[]>((resolve, reject) => {
        const manager = getManager();

        manager.find(DropResultsView, { where: { IdSession: Between(initSession, finalSession) } }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

}

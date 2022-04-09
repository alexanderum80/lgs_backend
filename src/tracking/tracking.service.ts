import { Between, getManager, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PlayerStatusView, PlayerStatusCheckView, PlayerTrackingView, FinalPlayerSessions } from './tracking.entity';

@Injectable()
export class TrackingService {
  // current player status
  async findCurrentPlayersStatus(): Promise<PlayerStatusView[]> {
    try {
      return new Promise<PlayerStatusView[]>((resolve, reject) => {
        const manager = getManager();

        manager.find(PlayerStatusView).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async findCurrentPlayerStatus(idPlayer: number): Promise<PlayerStatusView[]> {
    try {
      return new Promise<PlayerStatusView[]>((resolve, reject) => {
        const manager = getManager();

        manager.find(PlayerStatusView, { where: { IdPlayer: idPlayer }}).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  // current player status check
  async findCurrentPlayersStatusCheck(): Promise<PlayerStatusCheckView[]> {
    try {
      return new Promise<PlayerStatusCheckView[]>((resolve, reject) => {
        const manager = getManager();

        manager.find(PlayerStatusCheckView).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async findCurrentPlayerStatusCheck(idPlayer: number): Promise<PlayerStatusCheckView[]> {
    try {
      return new Promise<PlayerStatusCheckView[]>((resolve, reject) => {
        const manager = getManager();

        manager.find(PlayerStatusCheckView, { where: { IdPlayer: idPlayer }}).then(result => {
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
  async findCurrentPlayersTracking(): Promise<PlayerTrackingView[]> {
    try {
      return new Promise<PlayerTrackingView[]>((resolve, reject) => {
        const manager = getManager();

        manager.find(PlayerTrackingView).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }

  async findCurrentPlayerTracking(idPlayer: number): Promise<PlayerTrackingView[]> {
    try {
      return new Promise<PlayerTrackingView[]>((resolve, reject) => {
        const manager = getManager();

        manager.find(PlayerTrackingView, { where: { IdPlayer: idPlayer }}).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

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

}

import { Router } from 'express'

export abstract class Route {
  public abstract applyRoute(route: Router): void
}
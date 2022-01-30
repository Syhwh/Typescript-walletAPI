import express = require('express');
import { asClass, createContainer } from "awilix";
import { SubscriptionMySQLRepository } from "./subscriptions/infrastructure/subscriptionMysql.repository";
import { scopePerRequest } from 'awilix-express';
import { SubscriptionService } from './subscriptions/services/subscription.service';


export default (app: express.Application): void => {
  const container = createContainer({
    injectionMode: 'CLASSIC'
  });
  container.register({
    // repositories
    subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),
    // services
    subscriptionService: asClass(SubscriptionService).scoped()
  });
  app.use(scopePerRequest(container));
};
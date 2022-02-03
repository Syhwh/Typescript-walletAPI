import express = require('express');
import { asClass, createContainer } from "awilix";
import { SubscriptionMySQLRepository } from "./subscriptions/infrastructure/subscriptionMysql.repository";
import { scopePerRequest } from 'awilix-express';
import { SubscriptionService } from './subscriptions/services/subscription.service';
import { TransactionsMySQLRepository } from './transactions/infrastructure/transactionsMysql.repository';
import { BalanceMySQLRepository } from './balance/infrastructure/balanceMysql.repository';
import { TransactionService } from './transactions/services/transaction.service';


export default (app: express.Application): void => {
  const container = createContainer({
    injectionMode: 'CLASSIC'
  });
  container.register({
    // repositories
    subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),
    transactionRepository: asClass(TransactionsMySQLRepository).scoped(),
    balanceRepository: asClass(BalanceMySQLRepository).scoped(),

    // services
    subscriptionService: asClass(SubscriptionService).scoped(),
    transactionService: asClass(TransactionService).scoped(),

  });
  app.use(scopePerRequest(container));
};
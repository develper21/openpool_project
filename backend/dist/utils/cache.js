"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
class CacheService {
    constructor() {
        this.cache = new node_cache_1.default({
            stdTTL: 3600, // 1 hour
            checkperiod: 600,
        });
    }
    get(key) {
        return this.cache.get(key);
    }
    set(key, value, ttl) {
        if (ttl) {
            this.cache.set(key, value, ttl);
        }
        else {
            this.cache.set(key, value);
        }
    }
    del(key) {
        this.cache.del(key);
    }
    flush() {
        this.cache.flushAll();
    }
    generateSummaryKey(paperId, role) {
        return `summary:${paperId}:${role}`;
    }
    generatePubmedKey(pmid) {
        return `pubmed:${pmid}`;
    }
}
exports.cache = new CacheService();

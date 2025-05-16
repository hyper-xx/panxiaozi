import { sql } from "drizzle-orm";
import {
	mysqlTable,
	varchar,
	int,
	datetime,
	index,
	tinyint,
	unique,
} from "drizzle-orm/mysql-core";

// 分类表定义
export const category = mysqlTable("category", {
	id: int("id").autoincrement().primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	key: varchar("key", { length: 100 }).notNull().unique(),
});

export const resource = mysqlTable(
	"resource",
	{
		id: int("id").autoincrement().primaryKey().notNull(),
		categoryKey: varchar("category_key", { length: 100 }).notNull(),
		pinyin: varchar("pinyin", { length: 2000 }).notNull().default(""),
		title: varchar("title", { length: 255 }).notNull(),
		desc: varchar("desc", { length: 100 }).notNull(),
		diskType: varchar("disk_type", { length: 10 }).notNull(), // 网盘类型
		url: varchar("url", { length: 1000 }).notNull(), // 资源地址
		hotNum: int("hot_num").notNull().default(0), // 热度，添加索引
		isShowHome: tinyint("is_show_home").default(0),
		updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP`),
	},
	(table) => [
		index("idx_hot_num").on(table.hotNum),
		unique("unique_title").on(table.title),
	],
);

export const user = mysqlTable("user", {
	id: int("id").autoincrement().primaryKey().notNull(),
	username: varchar("username", { length: 255 }).notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// 导出类型定义，方便在应用中使用
export type Category = typeof category.$inferSelect;
export type NewCategory = typeof category.$inferInsert;

export type Resource = typeof resource.$inferSelect;
export type User = typeof user.$inferSelect;

-- CreateTable
CREATE TABLE `appellation` (
    `appellation_id` INTEGER NOT NULL,
    `appellation` VARCHAR(50) NOT NULL,
    `parent_id` INTEGER NULL,

    PRIMARY KEY (`appellation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appellation_has_grape_variety` (
    `appellation_id` INTEGER NOT NULL,
    `grape_variety_id` INTEGER NOT NULL,

    INDEX `fk_appellation_has_grape_variety_appellation1_idx`(`appellation_id`),
    INDEX `fk_appellation_has_grape_variety_grape_variety2`(`grape_variety_id`),
    PRIMARY KEY (`appellation_id`, `grape_variety_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grape_variety` (
    `grape_variety_id` INTEGER NOT NULL,
    `grape_variety` VARCHAR(50) NOT NULL,
    `wine_type_id` INTEGER NULL,

    INDEX `fk_grape_variety_wine_type1_idx`(`wine_type_id`),
    PRIMARY KEY (`grape_variety_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `product_id` INTEGER NOT NULL,
    `product` VARCHAR(50) NOT NULL,
    `parent_id` INTEGER NULL,

    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wine` (
    `wine_id` INTEGER NOT NULL AUTO_INCREMENT,
    `appellation_id` INTEGER NULL,
    `wine_color_id` INTEGER NOT NULL,
    `wine_blend_id` INTEGER NULL,
    `grape_variety_id` INTEGER NULL,

    INDEX `fk_wine_appellation1`(`appellation_id`),
    INDEX `fk_wine_grape_variety1_idx`(`grape_variety_id`),
    INDEX `fk_wine_wine_blend1_idx`(`wine_blend_id`),
    INDEX `fk_wine_wine_color1`(`wine_color_id`),
    PRIMARY KEY (`wine_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wine_blend` (
    `wine_blend_id` INTEGER NOT NULL,
    `wine_blend` VARCHAR(50) NULL,
    `wine_type_id` INTEGER NULL,
    `appellation_id` INTEGER NULL,
    `wine_color_id` INTEGER NULL,

    INDEX `fk_wine_blend_appellation1_idx`(`appellation_id`),
    INDEX `fk_wine_blend_wine_type1_idx`(`wine_type_id`),
    PRIMARY KEY (`wine_blend_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wine_blend_has_grape_variety` (
    `wine_blend_id` INTEGER NOT NULL,
    `grape_variety_id` INTEGER NOT NULL,

    INDEX `fk_wine_blend_has_grape_variety_grape_variety1_idx`(`grape_variety_id`),
    INDEX `fk_wine_blend_has_grape_variety_wine_blend1_idx`(`wine_blend_id`),
    PRIMARY KEY (`wine_blend_id`, `grape_variety_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wine_color` (
    `wine_color_id` INTEGER NOT NULL,
    `wine_color` VARCHAR(20) NULL,

    PRIMARY KEY (`wine_color_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wine_type` (
    `wine_type_id` INTEGER NOT NULL,
    `wine_type` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`wine_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wine_type_pairs_with_product` (
    `wine_type_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `excellent_pairing` TINYINT NULL,

    INDEX `fk_wine_type_has_product_product1_idx`(`product_id`),
    INDEX `fk_wine_type_has_product_wine_type1_idx`(`wine_type_id`),
    PRIMARY KEY (`wine_type_id`, `product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `appellation_has_grape_variety` ADD CONSTRAINT `fk_appellation_has_grape_variety_appellation1` FOREIGN KEY (`appellation_id`) REFERENCES `appellation`(`appellation_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `appellation_has_grape_variety` ADD CONSTRAINT `fk_appellation_has_grape_variety_grape_variety2` FOREIGN KEY (`grape_variety_id`) REFERENCES `grape_variety`(`grape_variety_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `grape_variety` ADD CONSTRAINT `fk_grape_variety_wine_type1` FOREIGN KEY (`wine_type_id`) REFERENCES `wine_type`(`wine_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `wine` ADD CONSTRAINT `fk_wine_appellation1` FOREIGN KEY (`appellation_id`) REFERENCES `appellation`(`appellation_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `wine` ADD CONSTRAINT `fk_wine_grape_variety1` FOREIGN KEY (`grape_variety_id`) REFERENCES `grape_variety`(`grape_variety_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `wine` ADD CONSTRAINT `fk_wine_wine_blend1` FOREIGN KEY (`wine_blend_id`) REFERENCES `wine_blend`(`wine_blend_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `wine` ADD CONSTRAINT `fk_wine_wine_color1` FOREIGN KEY (`wine_color_id`) REFERENCES `wine_color`(`wine_color_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `wine_blend` ADD CONSTRAINT `fk_wine_blend_appellation1` FOREIGN KEY (`appellation_id`) REFERENCES `appellation`(`appellation_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `wine_blend` ADD CONSTRAINT `fk_wine_blend_wine_type1` FOREIGN KEY (`wine_type_id`) REFERENCES `wine_type`(`wine_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `wine_blend_has_grape_variety` ADD CONSTRAINT `fk_wine_blend_has_grape_variety_grape_variety1` FOREIGN KEY (`grape_variety_id`) REFERENCES `grape_variety`(`grape_variety_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `wine_blend_has_grape_variety` ADD CONSTRAINT `fk_wine_blend_has_grape_variety_wine_blend1` FOREIGN KEY (`wine_blend_id`) REFERENCES `wine_blend`(`wine_blend_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `wine_type_pairs_with_product` ADD CONSTRAINT `fk_wine_type_has_product_product1` FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `wine_type_pairs_with_product` ADD CONSTRAINT `fk_wine_type_has_product_wine_type1` FOREIGN KEY (`wine_type_id`) REFERENCES `wine_type`(`wine_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
